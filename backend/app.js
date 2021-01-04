const Post = require ('./models/post');
var express = require('express');
const mongoose = require ('mongoose');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client


//connection to mongoose
mongoose
.connect("mongodb+srv://new-user:3zER6FntuZDwzQPH@cluster0.vxxiw.mongodb.net/node-angular?retryWrites=true&w=majority "
,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>{
console.log('connected to database !');
})
.catch(()=>{
console.log('connection failed !');
});


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
    //mongoose db
    const post = new Post({
        title :req.body.title,
        content : req.body.content
    });
    post.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message : 'post added successfully',
            postId: createPost._id
        });
    });
    
});

//get list of post
app.get('/api/posts',(req, res, next) => {
    Post.find()
    .then(doc =>{
        console.log(doc);
        res.status(200).json({
            message:'Posts fetched sucess',
            posts: doc
        });
    }); 
});
app.delete('/api/posts/:id',(req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result=>{
        console.log(result);
    res.status(200).json({
            message:'Post deleted',
    });
});
});


module.exports = app;