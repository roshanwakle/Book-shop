const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

router.post("/postUser", async (req, res) => {
	try {
		const { error } = validate(req.body);
		console.log(">>>>>>>>>>>>>>>>>", req.body)
		if (error) return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/', async (req, res) => {
	try {
		let user = await User.find();
		res.send(user);
	} catch (e) {
		res.json({ message: e.message })
	}
})

router.get('/:email', async (req, res) => {
	try {
		let user = await User.findOne({ email: req.params.email });
		res.json(user);
	} catch (e) {
		res.json({ message: e.message })
	}
})

router.put("/:id", async (req, res) => {
	try {
		let data = await User.updateOne(req.params, { $set: req.body })
		res.json(data)
	} catch (e) {
		res.json({ message: e.message })

	}

})

router.delete("/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id });
		res.status(201).json("User deleted Successfully");
	} catch (e) {
		response.status(409).json({ message: e.message });
	}
})

router.patch('/addcart', async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		if (!user) return res.status(400).json({ msg: "User does not exist." })

		await User.findOneAndUpdate({ _id: req.user.id }, {
			cart: req.body.cart
		})

		return res.json({ msg: "Added to cart" })
	} catch (err) {
		return res.status(500).json({ msg: err.message })
	}

})
//send email or reset password

// email config

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: true,
	auth: {
		user: 'roshan.wakle@aitglobalinc.com',
		pass: 'buicbvnhlabxzmwt'
	}
})


router.post('/ForgotPassword', async (req, res) => {
	console.log(req.body)
	const { email } = req.body;

	if (!email) {
		res.status(401).json({ status: 401, message: "Enter Your Email" })
	}

	try {
		const userfind = await User.findOne({ email: email });

		// token generate for reset password
		const token = jwt.sign({ _id: userfind._id }, process.env.JWTPRIVATEKEY, {
			expiresIn: "1d"
		});
		// console.log(token,"setusertoken");

		const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifyToken: token }, { new: true })
		console.log(setusertoken, "setusertoken");

		if (setusertoken) {
			const mailOptions = {
				from: 'roshan.wakle@aitglobalinc.com',
				to: email,
				subject: "Sending Email For password Reset",
				text: `This Link Valid For 2 MINUTES http://localhost:3000/ForgotPassword/${userfind.id}/${setusertoken.verifyToken}`
			}

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log("error", error);
					res.status(401).json({ status: 401, message: "email not send" })
				} else {
					console.log("Email sent", info.response);
					res.status(201).json({ status: 201, message: "Email sent Succsfully" })
				}
			})

		}

	} catch (error) {
		res.status(401).json({ status: 401, message: "invalid user" })
	}
})

// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
	// console.log(req.params,">>>>.")

    try {
        const validuser = await User.findOne({_id:id,verifyToken:token});
        // console.log(validuser,">>>>.validuser")
        const verifyToken = jwt.verify(token,process.env.JWTPRIVATEKEY);

        console.log(verifyToken,"verifyToken")

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

//reset password

router.post("/:id/:token",async(req,res)=>{
	console.log("roshan")
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await User.findOne({_id:id,verifyToken:token});
        
        const verifyToken = jwt.verify(token,process.env.JWTPRIVATEKEY);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});
            console.log(setnewuserpass,"{{{{{{{{{{{{{{")
            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

const validate = (data) => {
	const schema = Joi.object({
		fullName: Joi.string().required().label("First Name"),
		phone: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		// isAdmin: Joi.boolean().isAdmin().label("isAdmin"),

	});
	return schema.validate(data);
};

module.exports = router;
