// A Mongoose schema for a User model, including fields for username, email, password, isVerified, isAdmin, forgetPasswordToken, forgetPasswordTokenExpiry, verifyToken, and verifyTokenExpiry. 
// The schema also includes validation for required fields and unique usernames.
// The User model is then created or accessed, and exported for use in other modules.
import mongoose from "mongoose"

const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },

    //tokens
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User

