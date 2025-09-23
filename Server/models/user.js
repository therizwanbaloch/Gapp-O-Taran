const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{type: String, reqired: true},
    email:{type: String, reqired: true, unique: true},
    password:{type: String, reqired: true},
    profileImageUrl:{type: String, default: null},
},
{ timestamps: true }
);

const User = mongoose.model("User", UserSchema)

module.exports = User