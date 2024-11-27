const SMDModel = require('../models/SocialMediasModel')

const saveTokensToDB = async (userId, platform, tokens) => {
    try {
        const updateData = {
            [`${platform}.platformUserId`]: tokens.platformUserId,
            [`${platform}.accessToken`]: tokens.accessToken,
            [`${platform}.refreshToken`]: tokens.refreshToken,
            [`${platform}.expiresAt`]: tokens.expiresAt,
        };

        // Update the document for the user and platform or create one if it doesn't exist
        const result = await SMDModel.findOneAndUpdate(
            { userId }, // Find by userId
            { $set: updateData }, // Set the platform-specific data
            { upsert: true, new: true } // Create new if not found, return updated document
        );
    } catch (error) {
        console.error('Error saving tokens to DB:', error);
        throw new Error('Database update failed');
    }
};

module.exports = saveTokensToDB;
