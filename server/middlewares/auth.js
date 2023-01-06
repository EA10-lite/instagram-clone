
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({ error: "Access Denied: No JWT provdide." });

    try {
        const result = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = result;
        
        next();
    } catch (error) {
        res.status(401).send({ error: "Access Denied: You are not Authenticated" });
    }
};