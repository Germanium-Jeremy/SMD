const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose')
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

// Example Endpoint for Aggregating Feeds
app.get('/api/feeds', async (req, res) => {
     try {
          const twitterFeed = await axios.get(process.env.API_X_FEED, {
               headers: {
                    Authorization: `Bearer YOUR_TWITTER_BEARER_TOKEN`,
               },
          });

          const instagramFeed = await axios.get('https://graph.instagram.com/me/media', {
               params: {
                    access_token: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
                    fields: 'id,caption',
               },
          });

     // Aggregate Data
          const feeds = [
               ...twitterFeed.data.data.map((item) => ({
                    platform: 'Twitter',
                    content: item.text,
               })),
                    ...instagramFeed.data.data.map((item) => ({
                    platform: 'Instagram',
                    content: item.caption || 'No caption available',
               })),
          ];

          res.json(feeds);
     } catch (error) {
          console.error('Error fetching feeds:', error);
          res.status(500).send('Error fetching feeds');
     }
});

mongoose.connect(process.env.MONGOOSE_API_URL).then(() => {
     console.log("SMD Clustor Connected Successfully")
}).catch(error => {
     console.log("Error Connecting to SMD: ", error)
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app