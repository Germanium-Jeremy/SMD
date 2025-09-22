const crypto = require('crypto');
const querystring = require('querystring')
const UserModel = require("../models/UserModel")
const axios = require('axios');
const saveTokensToDB = require('./SavingController')
const pkceStore = {};

const generateCodeVerifier = () => {
     return crypto.randomBytes(32).toString('hex');
};

const generateCodeChallenge = (codeVerifier) => {
     const hash = crypto.createHash('sha256').update(codeVerifier).digest('base64');
     return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // URL-safe Base64
};

const generateUrl = async (req, res) => {
     const { userId } = req.body;
     if (!userId) {
          return res.status(400).json({ error: "User ID is required." });
     }
     const state = crypto.randomBytes(16).toString('hex');
     const codeVerifier = generateCodeVerifier();
     const codeChallenge = generateCodeChallenge(codeVerifier);

     pkceStore[state] = { codeVerifier, userId };

     const params = querystring.stringify({
          response_type: 'code',
          client_id: process.env.TWITTER_URL_AUTH_CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URL,
          scope: 'tweet.read users.read',
          state: state,
          code_challenge: codeChallenge,
          code_challenge_method: 'S256' 
     })
     const authorizationUrl = `${process.env.TWITTER2}/i/oauth2/authorize?${params}`
     res.status(200).json({ url: authorizationUrl })
}

const callbackRoute = async (req, res) => { 
     const { code, state } = req.query;
     const pkceData = pkceStore[state];

     if (!pkceData) {
          console.error("State mismatch or state expired.");
          return res.status(400).json({ error: "Invalid or expired state." });
     }

     const { codeVerifier, userId } = pkceData;
          try {
          const tokenUrl = `${process.env.TWITTER}/2/oauth2/token`;
          const basicAuth = Buffer.from(`${process.env.TWITTER_URL_AUTH_CLIENT_ID}:${process.env.TWITTER_URL_AUTH_CLIENT_SECRET}`).toString('base64');
          const requestBody = querystring.stringify({
               client_id: process.env.TWITTER_URL_AUTH_CLIENT_ID,
               client_secret: process.env.TWITTER_URL_AUTH_CLIENT_SECRET,
               code,
               grant_type: "authorization_code",
               redirect_uri: process.env.REDIRECT_URL,
               code_verifier: codeVerifier,
          });
          const response = await axios.post(tokenUrl, requestBody, {
               headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${basicAuth}`
               }
          });

          const { access_token, scope, expires_in } = response.data;
          console.log("Access tokens: ", access_token)

          // Fetch user ID from X
          const userInfo = await axios.get(`${process.env.TWITTER}/2/users/me`, {
               headers: {
                    Authorization: `Bearer ${access_token}`,
               },
          });

          const { id, username } = userInfo.data.data;

          const tokens = {
               platformUserId: id,
               accessToken: access_token,
               scope: scope,
               expiresAt: new Date(Date.now() + expires_in * 1000),
          };     
          await saveTokensToDB(userId, 'Twitter', tokens);
          delete pkceStore[state];
     
          res.redirect(`${process.env.CLIENT_URL_REDIRECT_SUCCESS}/dashboard?status=success`)
     } catch (error) {
          console.error(error.response?.data || error.message);
          res.redirect(`${process.env.CLIENT_URL_REDIRECT_SUCCESS}?message=${encodeURIComponent("Failed to exchange authorization code")}&status=error`);
     }
};

module.exports = { generateUrl, callbackRoute }