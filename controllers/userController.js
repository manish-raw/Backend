const User = require('../models/userModel');

const getUser = async( req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(302).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};


const getAllUsers = async (req, res)=>{
    try {
     const users = await User.find({});
     res.status(200).json({users});
    } catch (error) {
     res.status(500).json({message: error.message});
    }
 };


const updateUser = async (req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if(!user){
            return res.status(404).json({message: `Not able to find any user with id: ${req.params.id}`})
        }
        const updUser = await User.findById(req.params.id)
        res.status(200).json(updUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
};

const deleteUser = async( req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(404).json({message: `User with id ${req.params.id} does not exist`})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
};


 module.exports = {getUser, getAllUsers, updateUser, deleteUser}