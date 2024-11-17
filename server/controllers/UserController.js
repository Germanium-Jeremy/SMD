const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const generateToken = (user) => {
     const payload = { id: user._id, email: user.email };
     return jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: '10h' });
};

const registerUser = async (req, res) => {
     try {
          const requiredFields = ['username', 'email', 'password', 'phone', 'firstName', 'lastName'];
          const missingFields = requiredFields.filter(field => !req.body[field]);
          if (missingFields.length > 0) {
               return res.status(400).json({ error: `Missing required fields: ${missingFields.join(',')}` });
          }
          
          const existingUser = await UserModel.findOne({ email: req.body.email });
          if (existingUser) {
               return res.status(400).json({ error: 'Email already exists' });
          }

          let newUser = new UserModel(req.body);
          await newUser.validate();

          const salt = await bcrypt.genSalt(10);
          newUser.password = await bcrypt.hash(newUser.password, salt);


          await newUser.save();

          const accessToken = generateToken(newUser);
          res.status(201).json({ 
               message: "User Created Successfully",
               accessToken,
               user: { username: newUser.username, email: newUser.email, verified: newUser.verified, userId: user._id },
          })
     } catch (error) {
          console.log("Error Signing Up The User", error)
          if (error.name === 'ValidationError') {
               const errors = Object.keys(error.errors).map(key => error.errors[key].message);
               res.status(400).json({ errors });
          } else {
               res.status(500).json({ error: 'Internal Server Error' });
          }
     }
}

const signInUser = async (req, res) => {
     try {
          const { email, password } = req.body

          if (!email) {
               return res.status(400).json({ error: "Email is required" });
          }
          if (!password) {
               return res.status(400).json({ error: "Password is required" });
          }

          const user = await UserModel.findOne({ email });
          if (!user) {
               return res.status(401).json({ error: 'Account not found! Check your email' });
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
               return res.status(401).json({ error: 'Incorrect password' });
          }

          const accessToken = generateToken(user);

          res.status(200).json({
               message: "Login successfully",
               user: { username: user.username, email: user.email, userId: user._id, verified: user.verified },
               accessToken
          })
     } catch (error) {
          console.log("Error Signing In The User", error)
          if (error.name === 'ValidationError') {
               const errors = Object.keys(error.errors).map(key => error.errors[key].message);
               res.status(400).json({ errors });
          } else {
               res.status(500).json({ error: 'Internal Server Error' });
          }
     }
}



module.exports = { registerUser, signInUser }