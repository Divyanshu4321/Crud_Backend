const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let categarySchema = new Schema({
    category : {
        type: String,
    },
    },
    {
        collection:'user-categary'
    })
    module.exports=mongoose.model('user-categary',categarySchema);