const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	fullName:
	{
		type: String,
		required: true,

	},
	phone:
	{
		type: String,
		required: true,

	},
	email:
	{
		type: String,
		required: true
	},
	password:
	{
		type: String,
		required: true,

	},
	 verifyToken: {
		type: String
	},

	isAdmin: Boolean,

	cart: {
		type: Array,
		default: []
	}



}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
