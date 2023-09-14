const User = require("../models/userModel");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")

// create token
const createToken=(_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn:"3d"})
}

// sign up User
const signUp = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
      const existingUser = await User.findOne({ email });
    if (existingUser) throw Error("email already exists");

    if (!email || !password) throw Error("all fields must be filled");
    
    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const hashedPassword=await bcrypt.hash(password,10)

    const newUser = await User.create({email,password:hashedPassword})
    
    const token=createToken(newUser._id)
    res.status(200).json({email,token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// log in user
const logIn = async(req, res) => {
  const {email,password}=req.body
  try {
    if (!email || !password) throw Error("all fields must be filled");
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw Error("email does not exists");
    const correctPassword=await bcrypt.compare(password,existingUser.password)

    if (!correctPassword) {
      throw Error("password is wrong");
    }

    const token=createToken(existingUser._id)
  
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
