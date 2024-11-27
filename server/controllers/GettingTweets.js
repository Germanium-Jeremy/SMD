const axios = require('axios')
const SMDModel = require('../models/SocialMediasModel')
const tweetCache = new Map();


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
          console.log("Fetched Tweets:", tweets);

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
     const userId = req.query.userId;

     if (!userId) {
          return res.status(400).json({ error: "User ID is required." });
     }

     try {
          const socialMediaData = await SMDModel.findOne({ userId });
          if (!socialMediaData || !socialMediaData.Twitter?.accessToken) {
               return res.status(404).json({ error: "X account not linked" });
          }
          const { accessToken, platformUserId } = socialMediaData.Twitter;

          const tweets = await getTweets(platformUserId, accessToken)

          console.log("TWEETS: ", tweets)
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

module.exports = { TwitterTweets }