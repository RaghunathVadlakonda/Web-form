const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required : true
    },
    phonenumber : {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        index:true,
        sparse:true,
        match: /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/
    },
    jobtitle:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

});


module.exports = mongoose.model('User',userSchema);


