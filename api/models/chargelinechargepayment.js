/**
 * charge_line/charge payment model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidAmount } = require('../util/validation');


module.exports = class ChargeLineChargePayment  {
  /**
   * Create a new charge_line/charge payment instance.
   * @param {string} id_charge_line - UUID of the charge line
   * @param {string} id_charge_payment - UUID of the charge payment
   * @param {string} partial_payment - number if partial payment in involved. otherwise NULL

  */
  constructor({id_charge_line, id_charge_payment, partial_payment = null }) {
    this.id_charge_line = id_charge_line;
    this.id_charge_payment = id_charge_payment;
    this.partial_payment = partial_payment;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id_charge_line() {
    return this._id_charge_line;
  }

  set id_charge_line(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_charge_line');
      error.statusCode = 400;
      throw error;
    }
    this._id_charge_line = value;
  }

  get id_charge_payment() {
    return this._id_charge_payment;
  }
  
  set id_charge_payment(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_charge_payment');
      error.statusCode = 400;
      throw error;
    }
    this._id_charge_payment = value;
  }

  get partial_payment() {
    return this._partial_payment;
  }
 
  set partial_payment(value) {
    if (!isValidAmount(value) && value !== null) {
      const error = new Error('Invalid partial_payment');
      error.statusCode = 400;
      throw error;
    }
    this._partial_payment = value;
  }

  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all charge_line/charge payments from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM charge_line_charge_payment;`);
    return all;
  }

/**
   * Fetch all charge_line/charge payments by charge line from the database.
   * @returns {Promise<Object[]>}
   */
  static async getAllByChargeLine(id_charge_line) {
    const [all] = await db.execute(`SELECT * FROM charge_line_charge_payment WHERE id_ag_resolution = ?`, [id_charge_line]);
    return all;
  }

  

   /**
   * Fetch a charge_line/charge payment  by ID.
   * @param {string} id_charge_line
   * @param {string} id_charge_payment
   * @returns {Promise<Object>}
   */
  static async get(id_charge_line, id_charge_payment) {
    const [rows] = await db.execute(`SELECT * FROM charge_line_charge_payment WHERE id_charge_line = ? AND id_charge_payment = ?`, [id_charge_line, id_charge_payment]);
   
    if (rows.length === 0) {
      const error = new Error('charge_line/charge payment not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current charge_line/charge payment into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO charge_line_charge_payment 
          (id_charge_line, id_charge_payment, partial_payment) 
          VALUES (?, ?, ?)`, 
          [this.id_charge_line, this.id_charge_payment, this.partial_payment]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return {
        message: 'charge_line/charge payment created successfully' ,
        id: this.id_charge_line
      };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('Duplicate entry: this charge payment is already related to this line');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current charge_line/charge payment in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE charge_line_charge_payment 
          SET partial_payment = ?
          WHERE id_charge_line = ? AND id_charge_payment = ?`,
          [this.partial_payment, this.id_charge_line, this.id_charge_payment]
        );

      if (result.affectedRows === 0) {
        const error = new Error('charge_line/charge payment not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'charge_line/charge payment updated successfully' };
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
     * Delete a charge_line/charge payment by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_charge_line, id_charge_payment) {
      const [result] = await db.execute(`DELETE FROM charge_line_charge_payment WHERE id_charge_line = ? AND id_charge_payment = ?`, [id_charge_line, id_charge_payment]);
      if (result.affectedRows === 0) {
        const error = new Error('ag_resolution / person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'charge_line/charge payment deleted successfully' };
    }
  
}
