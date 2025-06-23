/**
 * Invoice payment model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidAmount, isNullOrStringMax255, isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class InvoicePayment extends BaseClass {
  /**
   * Create a new charge payment instance.
   * @param {string} id - UUID of the unit
   * @param {Number} amount - the amount paid 
   * @param {Date} invoice_payment_date - date of invoice payment
   * @param {Date} description - description - can be null
   * @param {Date} id_invoice - UUID of the invoice - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
  */
  constructor({id, amount, invoice_payment_date, id_invoice, createdAt = null, updatedAt = null, description = null }) {
    super({ id, createdAt, updatedAt });
    this.amount = amount;
    this.invoice_payment_date = invoice_payment_date;
    this.id_invoice = id_invoice;
    this.description = description;
  }
  
  /****************************getters and setters for data validation***********************************/


  get amount() {
    return this._amount;
  }

  set amount(value) {
    if (!isValidAmount(value)) {
      const error = new Error('Invalid value');
      error.statusCode = 400;
      throw error;
    }
    this._amount = value;
  }

  get invoice_payment_date() {
    return this._invoice_payment_date;
  }

  set invoice_payment_date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid invoice_payment_date: must be a valid date.');
      error.statusCode = 400;
      throw error;
    }
    this._invoice_payment_date = date;
  }
  

  get id_invoice() {
    return this._id_invoice;
  }
  
  set id_invoice(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_invoice');
      error.statusCode = 400;
      throw error;
    }
    this._id_invoice = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (!isNullOrStringMax255(value)) {
      const error = new Error('Invalid description: must be null or a string between 2 and 255 characters.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }
  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all invoice payments from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allInvoicePayments] = await db.execute(`SELECT * FROM invoice_payment;`);
    return allInvoicePayments;
  }

  /**
   * Fetch an invoice payment by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM invoice_payment WHERE invoice_payment.id = ?`, [id]);

    if (rows.length === 0) {
      const error = new Error('Invoice payment not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current invoice payment into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO invoice_payment 
          (id, amount, invoice_payment_date, description, id_invoice) 
          VALUES (?, ?, ?, ?, ?)`, 
          [this.id, this.amount, this.invoice_payment_date, this.description, this.id_invoice]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Invoice payment created successfully' };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current invoice payment in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE invoice_payment
          SET amount = ?, invoice_payment_date = ?, description = ?, id_invoice = ?
          WHERE invoice_payment.id = ?`,
          [this.amount, this.invoice_payment_date, this.description, this.id_invoice, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Invoice payment not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Invoice payment updated successfully' };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }

   /**
     * Delete an invoice payment by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id) {
      const [result] = await db.execute('DELETE FROM invoice_payment WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        const error = new Error('Invoice_payment not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Invoice_payment deleted successfully' };
    }
}
