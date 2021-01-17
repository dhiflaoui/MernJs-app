var express = require('express');
const postsRoutes = require("./routes/posts");
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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;