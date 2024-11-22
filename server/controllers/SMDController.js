const SMDModel = require('../models/SocialMediasModel')
const crypto = require('crypto');
const querystring = require('querystring')
const axios = require('axios')

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

     req.session.pkceStore = {
          ...req.session.pkceStore,
          [state]: { codeVerifier, userId },
     };

     const params = querystring.stringify({
          response_type: 'code',
          client_id: process.env.TWITTER_URL_AUTH_CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URL,
          scope: 'tweet.read users.read',
          state: state,
          code_challenge: codeChallenge,
          code_challenge_method: 'S256' 
     })
     const authorizationUrl = `https://X.com/i/oauth2/authorize?${params}`
     res.status(200).json({ url: authorizationUrl })
}

const callbackRoute = async (req, res) => {
     const { code, state } = req.query;
 
     const pkceData = req.session.pkceStore?.[req.query.state];
     console.log("PKCE Data Retrieved:", pkceData);
     if (!pkceData) {
          console.error("State mismatch or state expired.");
     }
 
     const { codeVerifier, userId } = pkceData;
     // delete req.session.pkceStore[state];
 
     try {
         const tokenUrl = "https://api.twitter.com/2/oauth2/token";
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

          const { access_token, refresh_token } = response.data;
          delete req.session.pkceStore[state];
     
          await saveTokensToDB(userId, { access_token, refresh_token });
     
          res.json({ message: "Authorization successful" });
     } catch (error) {
          console.error(error.response?.data || error.message);
          res.status(500).json({ error: "Failed to exchange authorization code" });
     }
};

module.exports = { generateUrl, callbackRoute }