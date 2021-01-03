var express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client



//Cors error solution
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

//post posts
app.post('/api/posts',(req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message : 'post added successfully'
    });
});

//get list of post
app.use('/api/posts',(req, res, next) => {
    const posts = [
        {   id : 'fa',
            title:'first service', 
            content:'this comming from the server'
        },
        {   id : 'Da',
            title:'second service',
            content:'this comming from the server'
        }
    ];
    res.status(200).json({
        message:'Posts fetched sucess',
        posts: posts
    });
});




module.exports = app;