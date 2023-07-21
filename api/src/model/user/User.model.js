const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        min: 3,
        max: 50,
    },
    username: {
        type: String,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    isAdmin: {
        type: Boolean,
        require: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);