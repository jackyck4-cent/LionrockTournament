const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, DB.Secret);
        next();
    } catch (error) {
        res.status(200).json({ status : -1 , message: "No token provided" });
    }
};