require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const DATABASEURL = process.env.DATABASEURL;
console.log(process.env.DBUSER, process.env.DBPASSWORD);
const app = express();

// route
const userRoutes = require('./routes/user');

//mongodb connection 
mongoose.connect(DATABASEURL,{ useNewUrlParser : true, useCreateIndex:true});

// DeprecationWarning
mongoose.Promise = global.Promise;

//allows static files to be accessed publicly available
app.use('/uploads',express.static('uploads'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// app.use((req,res,next)=>{
//     //* will give access to any origin
//  res.header('Access-Control-Allow-Origin','*');
// //  res.header('Access-Control-Allow-Origin','Origin,X-Requested-With,Content-Type,Accept');
// //  if(req.method === 'OPTIONS'){
// //      res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
// //      return res.status(200).json({});
// //  }
//  next();
// });


app.use('/form', userRoutes);


console.log('started');


//error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status('404');
    next(error); 
});

//error handling in application
app.use((error, req, res, next)=> {
    res.status(error.status || 500)
    res.json ({
        error :{
            message : error.message
        }
    });
});




app.listen(port, (req, res) => {
    console.log('server started on port : 5000');
});

module.exports = app;