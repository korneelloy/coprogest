
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Person = require('../models/person');

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const person = await Person.getUserByEmail(email);

    if (!person) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, person.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { personId: person.id, email: person.email, role: person.role_name },
      SECRET,
      { expiresIn: '1h' }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict', 
      maxAge: 60 * 60 * 1000 
    };
    
    res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json({
        message: 'Login successful',
        person: {
          id: person.id,
          email: person.email,
          role: person.role_name,
          first_name: person.first_name,
          last_name: person.last_name
        }
      });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
