const route = require('express').Router()

const Order = require('../models/order')


route.get('/',async(req,res) => {
  res.json({message:"working"})
})

module.exports = route