const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config(); //Load environment variable from .env file
const app = express();

const secret = bcrypt.genSaltSync(10); //Enscrpy the password 
const jwtSecret = 'shjdhskjhfsh34678sd';

app.use(express.json());
app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));
app.use(cookieParser());

// console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
//mongoose.connect('mongodb+srv://kexin:459000@cluster0.o3uceuw.mongodb.net/?retryWrites=true&w=majority');



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
            jwt.sign({email:userDoc.email, _id:userDoc._id},jwtSecret,{}, (err,token) =>{ //3rd param indicates option, e.g. token expiration time, algo type... . Here set as an empty object, 4th is a callback function called in async mode
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

 app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    if (token){ //If there is a valid token, decrypt it 
        jwt.verify(token,jwtSecret,{}, (err,user) => {
            if (err) throw err;
            res.json(user);
        });

    }else{
        res.json(null);
    }
    res.json({token});
 });

app.listen(4000);//Start an express server and makes it listen for incoming http requests at port 4000. Once having the server, it can make use of the routes you have defined above