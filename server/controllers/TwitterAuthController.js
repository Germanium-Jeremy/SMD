// const session = require('express-session');
// const passport = require('passport');
// const TwitterStrategy = require('passport-twitter').Strategy;
// const axios = require('axios');


// app.use(session({
//      secret: 'your_secret',
//      resave: false,
//      saveUninitialized: true,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Strategy
// passport.use(new TwitterStrategy({
//      consumerKey: process.env.CLIENT_KEY,
//      consumerSecret: process.env.CLIENT_SECRET,
//      callbackURL: "http://localhost:5000/auth/twitter/callback",
// },
// function(token, tokenSecret, profile, done) {
//   // Save user profile and tokens for API requests
//      return done(null, { profile, token, tokenSecret });
// }));

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// // Routes
// app.get('/auth/twitter', passport.authenticate('twitter'));

// app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
//     // Successful login
//     res.redirect('/dashboard');
// });

// app.get('/dashboard', (req, res) => {
//      if (!req.isAuthenticated()) {
//        return res.redirect('/');
//      }
   
//      res.send(`Welcome, ${req.user.profile.username}!`);
// });

// // Example Endpoint for Aggregating Feeds
// app.get('/api/feeds', async (req, res) => {
//      if (!req.isAuthenticated()) {
//        return res.status(401).send('Unauthorized');
//      }
   
//      const { token, tokenSecret } = req.user;
   
//      try {
//        const response = await axios.get('https://api.twitter.com/2/tweets', {
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        });
   
//        res.json(response.data);
//      } catch (error) {
//        console.error('Error fetching feeds:', error);
//        res.status(500).send('Error fetching feeds');
//      }
//    });