const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: 6,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User