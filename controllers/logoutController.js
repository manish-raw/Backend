const User = require('../models/userModel')

const handleLogout = async (req, res)=>{
    //on client also delete the access token

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt;

    // Is refresh token in DB?
    const foundUser = await User.findOne({refreshToken}).exec();
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, SameSite: 'None', secure: true});
        return res.sendStatus(204)
    }

    //Delete refresh Token
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    
    res.clearCookie('jwt', {httpOnly: true, SameSite: 'None', secure: true});
    return res.sendStatus(204)

}

module.exports = {handleLogout}