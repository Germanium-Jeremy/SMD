const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     username: { type: String, required: true },
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, unique: true, required: true },
     phone: { type: String, required: true },
     password: { type: String, required: true },
     birthDate: { type: Date, required: false },
     verified: { type: Boolean, default: false, required: true },
     refreshToken: { type: String, default: "", required: false },
     resetPasswordToken: { type: String, default: "", required: false },
     resetPasswordExpires: { type: Date, default: "", required: false }
}, {
     timestamps: true
})

const UserModel = mongoose.model("UserModel", UserSchema)
module.exports = UserModel