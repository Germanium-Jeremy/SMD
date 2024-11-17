const mongoose = require('mongoose')

const SocialMediaAccountsSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     Twitter: { platformUserId: { type: String }, accessToken: { type: String }, refreshToken: { type: String }, expiresAt: { type: Date } },
     Facebook: { platformUserId: { type: String }, accessToken: { type: String }, refreshToken: { type: String }, expiresAt: { type: Date } },
     Instagram: { platformUserId: { type: String }, accessToken: { type: String }, refreshToken: { type: String }, expiresAt: { type: Date } },
}, {
     timestamps: true
})

const SMDModel = mongoose.model("SMDModel", SocialMediaAccountsSchema)
module.exports = SMDModel