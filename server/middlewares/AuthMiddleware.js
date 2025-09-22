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
          console.warn("Not Authorized, No Token Found", error)
          res.status(401).json({ error: 'Not Authorized, No Token Found' });
     }
}

module.exports = protect