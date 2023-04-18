const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    "username": {
        required: true,
        type: String,
        unique: true
    },
    "email": {
        required: true,
        type: String,
        unique: true
    },
    "password": {
        required: true,
        type: String,
    }
});

module.exports = mongoose.model("user", userSchema);
