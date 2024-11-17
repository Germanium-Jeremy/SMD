const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     username: { type: String, required: true },
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, unique: true, required: true },
     phone: { type: String, required: true },
     password: { type: String, required: true },
     birthDate: { type: Date, required: true },
     verified: { type: Boolean, default: false, required: true }
}, {
     timestamps: true
})

const UserModel = mongoose.model("UserModel", UserSchema)
module.exports = UserModel