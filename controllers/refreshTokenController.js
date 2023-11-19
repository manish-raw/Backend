const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || foundUser.emailId !== decoded.emailId){
                return res.sendStatus(403)
            }
            accessToken = jwt.sign(
                {"emailId": decoded.emailId},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '40s'}
            );
            res.json({accessToken})
        }
    );
}

module.exports = {handleRefreshToken}