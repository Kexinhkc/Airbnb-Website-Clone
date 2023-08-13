const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //Load environment variable from .env file
const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL);
// mongoose.connect('mongodb+srv://kexin:459000@cluster0.o3uceuw.mongodb.net/?retryWrites=true&w=majority;');

app.get('/test',(req,res) => {
    res.json('test ok');
    
});

app.post('/register',(req,res) => {
    const { name,email,password } = req.body;
    res.json({name, email, password});
 });

app.listen(4000);//Start an express server and makes it listen for incoming http requests at port 4000. Once having the server, it can make use of the routes you have defined above