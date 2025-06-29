/**
 * Invoice model class.
 * Provides data validation and database operatings.
 */

const db = require('../util/database');
const { isValidUUIDv4, isStringMax255, isStringMax20, isValidAmount } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class Invoice extends BaseClass {
  /**
   * Create a new Invoice instance.
   * @param {string} id - UUID of the invoice
   * @param {Number} amount - Amount - can be null
   * @param {Date} invoice_date - Invoice date
   * @param {string} description - not null
   * @param {string} state - not null - enum {to be paid, contested, paid}
   * @param {string} id_ag_resolution - Link to ag resolution/budget- Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */


  constructor({ id, amount, invoice_date, description, state, id_ag_resolution, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.amount = amount;
    this.invoice_date = invoice_date;
    this.description = description;
    this.state = state;
    this.id_ag_resolution = id_ag_resolution;
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

  get invoice_date() {
    return this._invoice_date;
  }

  set invoice_date(value) {
    if (value !== null) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const error = new Error('Invalid invoice date: must be a valid Date or null.');
        error.statusCode = 400;
        throw error;
      }
      this._invoice_date = date;
    } else {
      this._invoice_date = null;
    }
  }
  
  get description() {
    return this._description;
  }

  set description(value) {
    if (!isStringMax255(value)) {
      const error = new Error('Invalid description: must be null or a string between 2 and 255 characters.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (!isStringMax20(value) || !["to be paid", "contested", "paid"].includes(value)) {
      const error = new Error('Invalid state');
      error.statusCode = 400;
      throw error;
    }
    this._state = value;
  }

  get id_ag_resolution() {
    return this._id_ag_resolution;
  }
  
  set id_ag_resolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_ag_resolution');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution = value;
  }

  /**********************************CRUD operatings************************************/

  /**
   * Fetch all invoices from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM invoice;`);
    return all;
  }

  /**
   * Fetch an Invoice by it's ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM invoice WHERE id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Invoice not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag resolution budget into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO invoice
          (id, amount, invoice_date, description, state, id_ag_resolution)
          VALUES (?, ?, ?, ?, ?, ?)`, 
          [this.id, this.amount, this.invoice_date, this.description, this.state, this.id_ag_resolution]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Invoice created successfully' };
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
   * Update the invoice in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE invoice
          SET amount = ?, invoice_date = ?, description = ?, state = ?, id_ag_resolution = ?
          WHERE id = ?`,
          [this.amount, this.invoice_date, this.description, this.state, this.id_ag_resolution, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Invoice not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Invoice updated successfully' };
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
   * Delete an invoice by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM invoice WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Invoice not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Invoice deleted successfully' };
  }
}
