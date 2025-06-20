const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_secret_key';

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET, {algorithms: ['HS256']}, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user; 
    next();
  });
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
