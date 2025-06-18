/**
 * Express router for login-related routes.
 * Maps HTTP methods and paths to controller functions.
 */

const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();


// post login-in request
router.post('/', loginController.login);


module.exports = router;
