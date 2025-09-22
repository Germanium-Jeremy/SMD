const mongoose = require('mongoose')

const SocialMediaAccountsSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     Twitter: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String }, connected: { type: Boolean, default: false } },
     Facebook: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String }, connected: { type: Boolean, default: false } },
     Instagram: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String }, connected: { type: Boolean, default: false } },
     Telegram: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String }, connected: { type: Boolean, default: false } },
}, {
     timestamps: true
})

const SMDModel = mongoose.model("SMDModel", SocialMediaAccountsSchema)
module.exports = SMDModel