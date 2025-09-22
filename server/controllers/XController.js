const crypto = require('crypto');
const querystring = require('querystring')
const SMDModel = require('../models/SocialMediasModel')
const axios = require('axios');
const pkceStore = {};
const tweetCache = new Map();

const generateCodeVerifier = () => {
     return crypto.randomBytes(32).toString('hex');
};

const generateCodeChallenge = (codeVerifier) => {
     const hash = crypto.createHash('sha256').update(codeVerifier).digest('base64');
     return hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // URL-safe Base64
};

const saveTokensToDB = async (userId, platform, tokens) => {
     try {
          const updateData = {
               [`${platform}.platformUserId`]: tokens.platformUserId,
               [`${platform}.accessToken`]: tokens.accessToken,
               [`${platform}.expiresAt`]: tokens.expiresAt,
               [`${platform}.connected`]: true,
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

const generateUrl = async (req, res) => {
     const userId = req.user.id;
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
          res.redirect(`${process.env.CLIENT_URL_REDIRECT_SUCCESS}/dashboard?message=${encodeURIComponent("Failed to exchange authorization code")}&status=error`);
     }
};

const getTweets = async (platformUserId, accessToken) => {
     const cachedData = tweetCache.get(platformUserId);
     const now = Date.now();
     if (cachedData && now - cachedData.timestamp < 10 * 60 * 1000) {
          console.log("Returning cached tweets.");
          return cachedData.tweets;
     }

     try {
          const url = `${process.env.TWITTER}/2/users/${platformUserId}/tweets`;
          const response = await axios.get(url, {
               headers: {
                   Authorization: `Bearer ${accessToken}`,
               },
               params: {
                   max_results: 5,
                   "tweet.fields": "id,text,created_at,attachments",
                   "expansions": "attachments.media_keys",
                   "media.fields": "url",
               },
          });

          const tweets = response.data;

          const formattedTweets = tweets.data.map(tweet => {
               const media = tweet.attachments?.media_keys
                    ? tweets.includes.media.find(m => tweet.attachments.media_keys.includes(m.media_key))
                    : null;

               return {
                    id: tweet.id,
                    text: tweet.text,
                    created_at: new Date(tweet.created_at).toDateString(),
                    title: tweet.text.split(' ').slice(0, 5).join(' '),
                    image: media?.url || null,
                    link: `${process.env.TWITTER2}/i/web/status/${tweet.id}`,
               };
          });

          tweetCache.set(platformUserId, { tweets: formattedTweets, timestamp: now });

          return formattedTweets;
     } catch (error) {
          if (error.response?.status === 429) {
               console.warn(`Rate limit reached. Please try again later.`);
               throw new Error("Rate Limit Reached.")
          }
          if (error.response?.status === 401) {
               throw new Error("Access Denied")
          }
          console.log(error.message)
          throw new Error("Failed to get tweets.");
     }
}

const TwitterTweets = async(req, res) => {
     const userId = req.user.id;
     const cookies = req.cookies;
     console.log("Cookies: ", cookies)

     if (!userId) {
          return res.status(400).json({ error: "User ID is required." });
     }

     try {
          const socialMediaData = await SMDModel.findOne({ userId });
          if (!socialMediaData || !socialMediaData.Twitter?.accessToken) {
               return res.status(400).json({ error: "X account not linked" });
          }

          const { accessToken, platformUserId } = socialMediaData.Twitter;

          const tweets = await getTweets(platformUserId, accessToken)

          res.status(200).json(tweets);
     } catch (error) {
          console.error(error.message);
          if (error.message === "Rate Limit Reached.") {
               return res.status(429).json({ error: "Unable to get tweets. Retry again later." });
          }
          if (error.message === "Access Denied") {
               return res.status(401).json({ error: "Invalid Creditials" });
          }
          res.status(500).json({ error: "Failed to fetch tweets." });
     }
}

const XConnectionsStatus = async (req, res) => {
     const userId = req.user.id
     if (!userId) return res.status(403).json({ error: 'User ID is required' })
     const connectObject = {
          XConnect: false,
          FBConnect: false,
          IGConnect: false,
          TConnect: false
     }
     
     try {
          const XData = await SMDModel.findOne({ userId })
          if (!XData) return res.status(400).json({ error: "X Not connected" })
          
          const currentTime = new Date()
          const expiresTime = new Date(XData.Twitter.expiresAt)
          
          if (currentTime < expiresTime) {
               connectObject.XConnect = true
          }

          if (XData.Facebook.connected) connectObject.FBConnect = true
          if (XData.Instagram.connected) connectObject.IGConnect = true
          if (XData.Telegram.connected) connectObject.TConnect = true

          return res.status(200).json({ connectObject })
     } catch (error) {
          console.warn("Error getting User's account status: ", error)
          res.status(500).json({ error: "Failed to fetch status of X" })
     }
}


module.exports = { generateUrl, callbackRoute, TwitterTweets, XConnectionsStatus }