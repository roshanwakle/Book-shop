
const admin = (req, res, next) => {
    if (!req.data.isAdmin) {
        return res.status(403).send("You are not admin user")
    }
next();
}
module.exports= admin