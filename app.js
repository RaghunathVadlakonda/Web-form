require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 5000;
const DATABASEURL = process.env.DATABASEURL;


// route
const userRoutes = require('./routes/users');

//mongodb connection 
mongoose.connect(DATABASEURL,{ useNewUrlParser : true, useCreateIndex : true});

// DeprecationWarning
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//allows static files to be accessed publicly available
app.use('/uploads',express.static('uploads'));


app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));




// app.use((req,res,next)=>{
//  res.header('Access-Control-Allow-Origin','*');
//  next();
// });


app.use('/form', userRoutes);


app.get('/', (req, res, next) => {
    res.send('started');
})


//error handling
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})

//error handling in application
app.use((error, req, res, next)=>{
 res.status(error.status || 500);
 res.json({
     error:{
         message : error.message
     }
 });
})

app.listen(port, (req, res) => {
    console.log('server started on port : 5000');
});

module.exports = app;