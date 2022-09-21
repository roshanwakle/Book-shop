const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    categories:{
        type:Array
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String ,
        required:true
    }
},{timestamps:true})


const product = mongoose.model('product',productSchema)

module.exports = product