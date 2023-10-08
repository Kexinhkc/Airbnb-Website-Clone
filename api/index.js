//require() imports libraries and modules, the variable can be used to access all functionalities of the imported lib/modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config(); //Load environment variable from .env file
const app = express();
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js')


const secret = bcrypt.genSaltSync(10); //Enscrpt the password 
const jwtSecret = 'shjdhskjhfsh34678sd';

///////////////////////////////////////////////////////////////////////////

//app.use() is a middleware function that adds middleware to the app's request processing pipeline. The function got access to the 'req' and 'res' objects and perform tasks such as authentication, data parsing etc 
app.use(express.json());
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

//The 'cookie-parser' middleware is used to parse cookies from incoming HTTP reqs and makes them available in the 'req' obj
app.use(cookieParser());

//Set up a static file server to serve files from a directory '__dirname + '/uploads'. A pro of using a server is that server can cache images in user's browser.
//The first '/uploads' is the path you want to use to access the images. Requests to '/uploads' will be mapped to the images in the directory "__dirname + '/uploads' "

app.use('/uploads',express.static(__dirname + '/uploads'));

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
//mongoose.connect('mongodb+srv://kexin:459000@cluster0.o3uceuw.mongodb.net/?retryWrites=true&w=majority');

function getUserDataFromReq(req){
    return new Promise ((resolve, rejext) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err,userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
   
}

///////////////////////////////////////////////////////////////////////////
//Below code is called 'endpoint route handlers'
app.get('/test',(req,res) => {
    res.json('test ok');
    
});

app.post('/login', async (req,res) => {

    const { email, password } = req.body;
    const userDoc = await User.findOne({email}); //Return a query object or null from the database
    //console.log(userDoc);

    if(userDoc){
        const passok = bcrypt.compareSync(password, userDoc.password); //Return a boolean val

        if (passok){
            jwt.sign({
                email:userDoc.email, 
                id:userDoc._id
             },jwtSecret,{}, (err,token) =>{ //3rd param indicates option, e.g. token expiration time, algo type... . Here set as an empty object, 4th is a callback function called in async mode
                if (err) throw err;
                res.cookie('token',token).json(userDoc);
            }); //Create a JSON Web Token and return the token in a JSON string
            
        }else {
            res.status(422).json("Incorrect Password");
        }

    }else{
        res.status(422).json("User Name Not Found");
    }
});

app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    
    if (token){ //If there is a valid token, decrypt it 
        jwt.verify(token,jwtSecret,{}, async (err,userData) => { //user is a chosen name for decoded payload, this param is auto included if a callback is provided
            if (err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
            // res.json(userData);
        });

    }else{
        res.json(null);
    }
    
 });


app.post('/register', async (req,res) => {

    const { name,email,password } = req.body;
    try{
       
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,secret),
        });
        res.json(userDoc);

    }catch(e){
        res.status(422).json(e);
    }
   
 });

 app.post('/logout', (req,res) =>{
    res.cookie('token','').json(true);
 } );

 app.post('/upload-by-link', async (req,res) =>{
    const {link} = req.body;
    console.log(link);
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({
        url: link,
        //'__dirname' is the path of the current directory(i.e./Users/apple/GitRepos/Airbnb-Website-Clone/api)
        dest: __dirname + '/uploads/' + newName,
    }); 

    res.json(newName);
 });

 //'multer' is a middleware for handling file uploads
 const photosMiddleware = multer({dest:'uploads'});//'uploads' is where uploaded photos should be stored
 //'photos' inside array() is the field name of the files on the form data
 app.post('/upload',photosMiddleware.array('photos',100),(req,res) =>{
    const files = req.files;//Uploaded files are accessed using req.file
    const uploadedFiles = []; 
    //rename the files with extention(e.g.'.jpg')
    for (let i = 0; i < files.length; i++){
        const {path, originalname} = files[i];
        const originalNameParts = originalname.split('.'); //The var contains an arr of parts before and after '.'. Example of original name: 'originalname:"cozy-apartment-scandinavian-style-kitchen-front.jpeg
        const ext = originalNameParts[originalNameParts.length - 1];
        const newPath = path +'.' + ext;
        fs.renameSync(path,newPath);//'path' is the old path/name of the file that needs to be renamed, after rename the same file can be accessed using the name 'newPath'. 
        uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);
 });

 app.post('/place', (req,res) => {
    const {token} = req.cookies;
    const { title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price } = req.body;

    jwt.verify(token,jwtSecret,{}, async (err,userData) => { //user is a chosen name for decoded payload, this param is auto included if a callback is provided
        if (err) throw err;
        
        const placeDoc = await Place.create({
            owner:userData.id,
            title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price, 
        });

        res.json(placeDoc);
    });
})

app.get('/places', async (req,res) => {
    res.json( await Place.find());
})

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{}, async (err,userData) => {

        const {id} = userData;
        res.json(await Place.find({owner:id}));
    }); 
});

app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/place', async (req,res) => {
    const {token} = req.cookies;
    const {id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price } = req.body;

    jwt.verify(token,jwtSecret,{}, async (err,userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                
                title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,checkOut,price,maxGuests,
            })

            await placeDoc.save();
            res.json('Okay');
        }
    })

})

app.post('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    const {checkIn, checkOut, numOfGuests, name, phone, place,price} = req.body;
    // console.log(name);
    Booking.create({
        checkIn, checkOut, numOfGuests, name, phone, place,price,user:userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err; 
    });
});

app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user:userData.id}).populate('place')); //'populate' together with the 'ref' in the database schema returns all properties data from the 'Place' database 
    
})

app.listen(4000);//Start an express server and makes it listen for incoming http requests at port 4000. Once having the server, it can make use of the routes you have defined above