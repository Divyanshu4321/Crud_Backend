
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let productSchema = new Schema({
    productName :{
        type:String
    },
    productPrice:{
        type:Number
    },
    rating:{
        type:Number
    },
    quantity:{
        type:Number
    },
    categorySelect:{
        type:String
    },
    },
    {
        collection:'Product-data'
    })
    module.exports=mongoose.model('Product-data',productSchema);