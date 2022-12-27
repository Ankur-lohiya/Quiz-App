const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtauth=require("../middlewares/jwtauth");

//user registeration
router.post("/register", async (req, res) => {
  try {
    //check user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({
        message: "User already exists",
        success: false,
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    // create user
    const user = new User(req.body);
    await user.save();
    res.send({
      message: "User created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    //check user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "User does not exists",
        success: false,
      });
    }
    //check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.APP_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});

//get user info
router.post("/user-info", jwtauth,async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});
module.exports = router;
