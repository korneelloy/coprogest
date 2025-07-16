const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');


function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function isManager(req, res, next) {
  
  if (req.user?.role !== 'manager') {
    return res.status(403).json({ message: 'Managers only.' });
  }
  next();
}

function isAssistant(req, res, next) {
  if (req.user?.role !== 'assistant' && req.user?.role !== 'manager') {
    return res.status(403).json({ message: 'Assistants (or managers) only.' });
  }
  next();
}

module.exports = {
  auth,
  isManager,
  isAssistant
};
