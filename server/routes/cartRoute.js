const route = require('express').Router()
const Cart = require('../models/cart')

route.post('/Addcart',async(req,res) => {
    const {email,cart } = req.body
    console.log(req.body, ">>>>>>");
    try {
        const data = await Cart.create({ email,cart })
        res.status(200).send({ message: data});

    } catch (error) {
        res.status(400).send({ message: error });

    }
})

module.exports = route