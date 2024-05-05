
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    username :{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    },
    {
        collection:'user-data'
    })
    module.exports=mongoose.model('user-data',userSchema);