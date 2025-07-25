/**
 * Charge payment model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidAmount, isNullOrStringMax255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class ChargePayment extends BaseClass {
  /**
   * Create a new charge payment instance.
   * @param {string} id - UUID of the unit
   * @param {Number} amount - the amount paid 
   * @param {Date} charge_payment_date - date of charge payment
   * @param {Date} description - description - can be null
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
  */
  constructor({id, amount, charge_payment_date, createdAt = null, updatedAt = null, description = null }) {
    super({ id, createdAt, updatedAt });
    this.amount = amount;
    this.charge_payment_date = charge_payment_date;
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
    const [allChargePayments] = await db.execute(`SELECT * FROM charge_payment ORDER BY charge_payment_date DESC;`);
    return allChargePayments;
  }

  /**
   * Fetch all charge payments per person
   * @param {string} personId
   * @returns {Promise<Object[]>}
   */
  static async fetchAllPerPerson(personId) {
    const [allChargePaymentsPerPerson] = await db.execute(`
      SELECT DISTINCT
        charge_payment.amount,
        charge_payment.charge_payment_date,
        charge_payment.description
      FROM charge_payment
      LEFT JOIN charge_line_charge_payment
        ON charge_line_charge_payment.id_charge_payment = charge_payment.id
      LEFT JOIN charge_line 
        ON charge_line.id = charge_line_charge_payment.id_charge_line
      LEFT JOIN charge_call
        ON charge_call.id = charge_line.id_charge_call
      WHERE charge_call.id_person = ?
    `, [personId]);
  
    return allChargePaymentsPerPerson;
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
          (id, amount, charge_payment_date, description) 
          VALUES (?, ?, ?, ?)`, 
          [this.id, this.amount, this.charge_payment_date, this.description]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'Charge payment created successfully',
        id: this.id 
      };
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
          SET amount = ?, charge_payment_date = ?, description = ?
          WHERE charge_payment.id = ?`,
          [this.amount, this.charge_payment_date, this.description, this.id]
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
