const route = require('express').Router()
const { User } = require("../models/user");
const Otp = require('../models/Otp')


route.post('/email-send', async (req, res) => {
    let data = await User.findOne({ email: req.body.email })
    const responseType = {}
    if (data) {
        let otpCode = Math.floor((Math.random() * 10000) + 1)
        let otpData = new Otp({
            email: req.body.email,
            code: otpCode,
            expireIn: new Date().getTime() + 300 * 1000
        })
        let otpResponse = await otpData.save()
        mailer()
        responseType.statusText = 'success'
        responseType.message = 'Plaese check your email ID'
    } else {
        responseType.statusText = 'error'
        responseType.message = 'email ID not exist '
    }
    res.status(200).json(responseType)
})


route.post('/change-password', async (req, res) => {
    let data = await Otp.find({ email: req.body.email, code: req.body.otpCode })
    const response = {}
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if (diff < 0) {
            response.message = 'Token Expire'
            response.statusText = 'error'

        } else {
            let user = await User.findOne({ email: req.body.email })
            user.password = req.body.password
            user.save()
            response.message = 'Password change succesfuly'
            response.statusText = 'success'
        }
    } else {
        response.message = 'Inalid Otp'
        response.statusText = 'error'
    }
    res.status(200).json(response)
})


const mailer = (email, otp) => {
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: "581",
        secure: false,
        auth: {
            user: "noreply@gmail.com",
            pass: "Code@123"
        }
    })

    var mailOption = {
        from: "noreply@gmail.com",
        to: "roshan.wakle@aitglobalinc.com",
        subject: "Sendin email fo forgot password",
        text: "thank you"
    }

    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent', info.response);
        }
    })
}
module.exports = route