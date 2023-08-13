const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    credentials: true,
    origin:'http://localhost:5173',
}));

app.get('/test',(req,res) => {
    res.json('test ok');
});

app.listen(4000);//Start an express server and makes it listen for incoming http requests at port 4000. Once having the server, it can make use of the routes you have defined above