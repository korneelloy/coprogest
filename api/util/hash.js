const bcrypt = require('bcrypt');
const { isValidPassword } = require('../util/validation');

async function hashPassword(rawPassword) {
  if (!isValidPassword(rawPassword)) {
    const error = new Error('Invalid password');
    error.statusCode = 400;
    throw error;
  }
  return await bcrypt.hash(rawPassword, 10);
}

module.exports = { hashPassword };
