/**
 * Charge payment model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidAmount, isNullOrStringMax255, isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class ChargePayment extends BaseClass {
  /**
   * Create a new charge payment instance.
   * @param {string} id - UUID of the unit
   * @param {Number} amount - the amount paid 
   * @param {Date} charge_payment_date - date of charge payment
   * @param {Date} description - description - can be null
   * @param {Date} id_charge_call - UUID of the charge date - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
  */
  constructor({id, amount, charge_payment_date, id_charge_call, createdAt = null, updatedAt = null, description = null }) {
    super({ id, createdAt, updatedAt });
    this.amount = amount;
    this.charge_payment_date = charge_payment_date;
    this.id_charge_call = id_charge_call;
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

  get charge_payment_date() {
    return this._charge_payment_date;
  }

  set charge_payment_date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid charge_payment_date: must be a valid date.');
      error.statusCode = 400;
      throw error;
    }
    this._charge_payment_date = date;
  }
  

  get id_charge_call() {
    return this._id_charge_call;
  }
  
  set id_charge_call(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_charge_call');
      error.statusCode = 400;
      throw error;
    }
    this._id_charge_call = value;
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
   * Fetch all charge payments from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allChargePayments] = await db.execute(`SELECT * FROM charge_payment;`);
    return allChargePayments;
  }

  /**
   * Fetch a charge payment by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM charge_payment WHERE charge_payment.id = ?`, [id]);

    if (rows.length === 0) {
      const error = new Error('Charge payment not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current charge payment into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO charge_payment 
          (id, amount, charge_payment_date, description, id_charge_call) 
          VALUES (?, ?, ?, ?, ?)`, 
          [this.id, this.amount, this.charge_payment_date, this.description, this.id_charge_call]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Charge payment created successfully' };
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
   * Update the current charge payment in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE charge_payment
          SET amount = ?, charge_payment_date = ?, description = ?, id_charge_call = ?
          WHERE charge_payment.id = ?`,
          [this.amount, this.charge_payment_date, this.description, this.id_charge_call, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Charge payment not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge payment updated successfully' };
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
     * Delete a charge payment by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id) {
      const [result] = await db.execute('DELETE FROM charge_payment WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        const error = new Error('Charge_payment not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge_payment deleted successfully' };
    }
}
