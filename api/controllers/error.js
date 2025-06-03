/**
 * Middleware to handle 404 Not Found errors.
 * Creates an Error object with a 404 status and passes it to the next error handler.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.get404 = (req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;  // Set HTTP status code for not found
  next(error);         // Pass error to next middleware (error handler)
};

/**
 * General error handling middleware.
 * Sends a JSON response with the error message and status code.
 * 
 * @param {Error} error - Error object passed from previous middleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.get500 = (error, req, res, next) => {
  res.status(error.status || 500); // Default to 500 Internal Server Error if status not set
  res.json({
    error: {
      message: error.message, // Send error message in response body
    },
  });
};
