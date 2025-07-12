/**
 * Contact model class.
 * Provides data validation and operations related to sedning emails.
 */
require('dotenv').config({ path: '../.env' });
const nodemailer = require('nodemailer');
const { isStringMax50, isStringMax1000, isValidEmail } = require('../util/validation');

module.exports = class Contact {
  /**
   * Create a new contact instance.
   * 
   *
   * @param {string} subject - subject of the email
   * @param {string} message - message of the email
   * @param {string} fromEmail - sender
   * @param {string[]} toEmails - receiver(s) 
   
  */

  constructor({subject, message, fromEmail, toEmails}) {
    this.subject = subject;
    this.message = message;
    this.fromEmail = fromEmail;
    this.toEmails = toEmails;
  }
  
  /****************************getters and setters for data validation***********************************/

  get subject() {
    return this._subject;
  }

  set subject(value) {
    if (!isStringMax50(value)) {
      const error = new Error('Invalid value');
      error.statusCode = 400;
      throw error;
    }
    this._subject = value;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    if (!isStringMax1000(value)) {
      const error = new Error('Invalid value');
      error.statusCode = 400;
      throw error;
    }
    this._message = value;
  }
  

  get fromEmail() {
    return this._fromEmail;
  }
  
  set fromEmail(value) {
    if (!isValidEmail(value)) {
      const error = new Error('Invalid email');
      error.statusCode = 400;
      throw error;
    }
    this._fromEmail = value;
  }

  get toEmails() {
    return this._toEmails;
  }
  
  set toEmails(value) {
    for (const email of value){
      if (!isValidEmail(email)) {
        const error = new Error('Invalid email');
        error.statusCode = 400;
        throw error;
      }
    }
    this._toEmails = value;
  }
  
  /**********************************EMAIL operations************************************/

  
  /**
   * Insert the current charge payment into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        service: 'yahoo',
        port: 465,
        secure: true, 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.YAHOO_APP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: `"Coprogest" <${process.env.SMTP_USER}>`,
        to: this.toEmails,
        subject: this.subject,
        text: `${this.message}\n\n— Message envoyé par : ${this.fromEmail}`,
      });
      console.log('Message sent: %s', info.messageId);
      } catch (err) {
        console.error('Error sending mail:', err);
      }
    }
  }
