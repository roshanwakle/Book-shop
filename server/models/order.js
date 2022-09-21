const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId:{
        type:String,
        require:true
    },
    product:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            },
        } 
    ],
    amount :{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})

const order = mongoose.model('order',orderSchema)

module.exports =order