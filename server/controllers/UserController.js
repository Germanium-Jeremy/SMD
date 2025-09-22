const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const generateToken = (user) => {
     const payload = { id: user._id, email: user.email };
     return jwt.sign(payload, process.env.JSON_WEB_TOKEN_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
     const payload = { id: user._id, email: user.email };
     return jwt.sign(payload, process.env.JSON_WEB_TOKEN_REFRESH_SECRET, { expiresIn: '4h' });
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

          const salt = await bcrypt.genSalt(10);
          const userpasswordHashed = await bcrypt.hash(req.body.password, salt)
          const newUser = await UserModel.create({
               username: req.body.username,
               email: req.body.email,
               password: userpasswordHashed,
               phone: req.body.phone,
               firstName: req.body.firstName,
               lastName: req.body.lastName
          })

          const accessToken = generateToken(newUser);
          const refreshToken = generateRefreshToken(newUser);
          newUser.refreshToken = refreshToken;
          await newUser.save();
          res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });
          res.status(201).json({token: accessToken })
     } catch (error) {
          console.log("Error Creating account: ", error)
          if (error.name === 'ValidationError') {
               const errors = Object.keys(error.errors).map(key => error.errors[key].message);
               res.status(400).json({ errors });
          } else {
               res.status(500).json({ error: 'Internal Server Error' + error });
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
               console.log("Account not found! Check your email")
               return res.status(401).json({ error: 'Account not found! Check your email' });
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
               return res.status(401).json({ error: 'Incorrect password' });
          }

          const accessToken = generateToken(user);
          const refreshToken = generateRefreshToken(user);
          user.refreshToken = refreshToken;
          await user.save();
          res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 });
          res.status(200).json({ token: accessToken });
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

const gettingUserData = async (req, res) => {
     try {
          const userId = req.user.id;
          const user = await UserModel.findById(userId).select('-password -__v -refreshToken -resetPasswordToken -resetPasswordExpires -createdAt -updatedAt');
          if (!user) return res.status(404).json({ error: 'User not found' });
          res.status(200).json(user);
     } catch (error) {
          console.warn("Internal Server Error", error)
          res.status(500).json({ error: 'Internal Server Error' });
     }
}

const handleRefreshToken = async (req, res) => { 
     const cookies = req.cookie;
     console.log("Cookies: ", cookies)
     if (!cookies?.refreshToken) return res.status(401).json({ error: 'Unauthorized' });
     const refreshToken = cookies.refreshToken;

     const user = UserModel.findOne({ refreshToken })
     if (!user) return res.status(403).json({ error: 'Forbidden' });

     jwt.verify(refreshToken, process.env.JSON_WEB_TOKEN_REFRESH_SECRET, (err, decoded) => {
          if (err || user._id.toString() !== decoded.id) return res.status(403).json({ error: 'Forbidden' });
          const accessToken = generateToken(user);
          res.status(200).json({ token: accessToken });
     })
}

module.exports = { registerUser, signInUser, gettingUserData, handleRefreshToken }