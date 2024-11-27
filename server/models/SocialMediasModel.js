const mongoose = require('mongoose')

const SocialMediaAccountsSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
     Twitter: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String } },
     Facebook: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String } },
     Instagram: { platformUserId: { type: String }, accessToken: { type: String }, expiresAt: { type: Date }, scope: { type: String } },
}, {
     timestamps: true
})

const SMDModel = mongoose.model("SMDModel", SocialMediaAccountsSchema)
module.exports = SMDModel