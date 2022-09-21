require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const registerRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoute')
const otpRoute = require('./routes/OtpRoutes')
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/users", registerRoutes);
app.use("/users", loginRoutes);
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/otp',otpRoute)




const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}`));
