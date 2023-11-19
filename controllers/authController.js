const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res)=>{
    const {emailID , password} = req.body;
    if(!emailID || !password) return res.status(400).json({message: `Please enter emailId and password`});

    const foundUser = await User.findOne({emailId: emailID}).exec();
    if(!foundUser) return res.status(401).json({message: `User does not exist with provided credentials`});

    const matchPassword = await bcrypt.compare(password, foundUser.password)
    if(matchPassword){
        const accessToken = jwt.sign(
            {"emailId": foundUser.emailId},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '40s'}
        );
        const refreshToken = jwt.sign(
            {"emailId": foundUser.emailId},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        
        // need to remove secure prop to check with ThunderClient for refresh url: secure: true,
        res.cookie('jwt', refreshToken, { httpOnly: true, SameSite: 'None',  maxAge: 24*60*60*1000 });
        res.json({accessToken})
    }else{
        res.sendStatus(401);
    }

}

module.exports = {handleLogin};