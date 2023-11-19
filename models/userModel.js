const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( 
    {
        emailId: {
            type: String,
            required: [true, "please enter emailId"]
        },
        roles: {
            User:{
                type: Number,
                default: 2001
            },
            Editor: Number,
            Admin: Number
        },
        password: {
            type: String,
            required: [true, "Please enter your password"]
        },
        refreshToken: String
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema);
module.exports = User;