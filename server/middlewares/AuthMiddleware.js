const jsonwebtoken = require('jsonwebtoken')

const protect = (req, res, next) => {
     try {
          const token = req.header('Authorization').replace('Bearer ', '');
          if (!token || token == "") return res.status(401).json({
               message: 'Authorization denied. Token missing!'
          })
          const decoded = jsonwebtoken.verify(token, process.env.JSON_WEB_TOKEN_SECRET)
          req.user = { id: decoded.id }
          next()
     } catch (error) {
               // Handle token verification errors
          if (error.name === 'TokenExpiredError') {
               // Token has expired
               console.warn("Authorization denied, token has expired", error);
               return res.status(401).json({ error: 'Token has expired. Please log in again.', status: "Token Expired" });
          } else {
               // Other verification errors
               console.warn("Not Authorized, invalid token", error);
               return res.status(401).json({ error: 'Not Authorized, invalid token' });
          }
     }
}

module.exports = protect