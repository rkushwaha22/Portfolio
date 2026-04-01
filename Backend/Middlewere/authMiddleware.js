const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token; // Ya req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // "Bearer TOKEN" se sirf TOKEN lena
        jwt.verify(token, SECRET_KEY , (err, user) => {
            if (err) return res.status(403).json("Token valid nahi hai!");
            req.user = user;
            next(); // Agar sab sahi hai, toh aage badho
        });
    } else {
        return res.status(401).json("Aap authenticated nahi hain!");
    }
};

module.exports = { verifyToken };