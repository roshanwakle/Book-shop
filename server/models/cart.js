const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
	
	email:
	{
		type: String,
		required: true
	},
	cart:{
       type:Array,
	//    default: []
		}
	


},{timestamps:true});


	const Cart = mongoose.model("Cart", cartSchema);

	module.exports = { Cart };
