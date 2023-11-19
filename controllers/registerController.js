const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res)=>{
    const {emailID, password} = req.body;
    if(!emailID || !password) return res.status(400).json({message: `Please enter emailId and password`});

    const duplicate = await User.findOne({emailId: emailID}).exec();
    if(duplicate) return res.status(409).json({message: `user with ${emailID} already exist`})

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            "emailId": emailID, 
            "password": hashPassword
        });  

        res.status(201).json({message: `User created successfully with ${emailID}`});
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

module.exports = {handleNewUser};