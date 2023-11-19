const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedData)=>{
            if(err) return res.sendStatus(403);
            next();
        }
    );
}

module.exports = verifyJWT;