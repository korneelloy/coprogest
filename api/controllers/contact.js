const Contact = require('../models/contact');


/**
 * post a new message.
 */
exports.postOne = async (req, res, next) => {
  try {
    const subject = req.body.subject;
    const message = req.body.message;
    const fromEmail = req.body.fromEmail;
    const toEmails = req.body.toEmails;

    const contact = new Contact({
      subject,
      message,
      fromEmail,
      toEmails
    });
    
    const postResponse = await contact.post();

    res.status(200).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};
