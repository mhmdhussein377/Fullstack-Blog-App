const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

router.post("/register", async(req, res) => {

    const {username, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({username, password: hashedPassword});
        const savedUser = await user.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res
            .status(500)
            .json(error);
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            return res.status(401).json("Wrong credentials");
        }

        const validate = await bcrypt.compare(req.body.password, user.password);
        
        if(!validate) {
            return res.status(401).json("Wrong credentials");
        }

        const token = jwt.sign({username: user.username, id: user._id}, process.env.SECRET_KEY, {
            expiresIn: "5d"
        });

        const {password, ...others} = user._doc;

        res.status(200).json({...others, token});
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router