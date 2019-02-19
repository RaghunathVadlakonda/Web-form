const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const User = require('../models/user');


//set the storage engine
const storage = multer.diskStorage ({
    destination : './public/uploads',
    filename: function(req, file, callback) {
        req.newFileName = new Date().toISOString() + file.originalname;
        callback(null , req.newFileName);
    }
});

const fileFilter = (req, file, callback) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
      } else {
        callback(null, false);
      }
    };

// stores in uploads folder
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


// route 

router.post('/form', upload.single('image'), (req, res, next) => {
    const user = new User ({
        name : req.body.name,
        phonenumber : req.body.phonenumber,
        email : req.body.email,
        jobtitle : req.body.jobtitle,
        image : req.newFileName,
    });
user
.save()
.then (result => {
    console.log(result);
    res.status(200).json({
        message : 'success',
        createdUser: user
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json({
        error : err
    });
});
});


  module.exports = router;