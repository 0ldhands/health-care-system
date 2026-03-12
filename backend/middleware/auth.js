// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token; // Read from cookie, not header
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded){
      req.userId = decoded.id;
      next();
    }
  } catch (error) { 
    res.clearCookie('token');
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};


module.exports=auth