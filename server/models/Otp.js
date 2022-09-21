const mongoose = require('mongoose')

const Schema = mongoose.Schema

const otpSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    code:{
        type:String
    },
    expireIn:{
        type:Number
    }
},{timestamps:true})

const Otp = mongoose.model('Otp',otpSchema)

module.exports =Otp