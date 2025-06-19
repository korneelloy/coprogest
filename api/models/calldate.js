/**
 * Call date model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50, isStringMax255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class CallDate extends BaseClass {
  /**
   * Create a new call date instance.
   * @param {string} id - UUID of the call date
   * @param {string} date_call - date of charge call - not null
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({ id, date_call, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.date_call = date_call;
  }

  /****************************getters and setters for data validation***********************************/

  get date_call() {
    return this._date_call;
  }

  set date_call(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid date: must be a valid date or null.');
      error.statusCode = 400;
      throw error;
    }
    this._date_call = date;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all call dates from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allCallDates] = await db.execute(`SELECT * FROM call_date`);
    return allCallDates;
  }

  /**
   * Fetch a call date by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM call_date WHERE id = ?`, [id]);

    if (rows.length === 0) {
      const error = new Error('Call date not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }

  /**
  * Insert the current call date into the database.
  * @returns {Promise<Object>}
  */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO call_date 
          (id, date_call) 
          VALUES (?, ?)`,
      [this.id, this.date_call]
    );

    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Call date created successfully' };
  }

  /**
   * Update the current call date in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE call_date
          SET date_call = ?
          WHERE id = ?`,
      [this.date_call, this.id]
    );

    if (result.affectedRows === 0) {
      const error = new Error('Call date not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Call date updated successfully' };
  }

  /**
   * Delete a call date by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM call_date WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Call date not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Call date deleted successfully' };
  }
}
