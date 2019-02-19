require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const DATABASEURL = process.env.DATABASEURL;
console.log(process.env.DBUSER, process.env.DBPASSWORD);
const app = express();

//mongodb connection 
mongoose.connect(DATABASEURL,{ useNewUrlParser : true});

// DeprecationWarning
mongoose.Promise = global.Promise;


//route
app.get('/form', (req,res) => {
    res.send('Welcome to web');
})


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