/**
 * Ag notice model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMin2Max50, isStringMin2Max255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgNotice extends BaseClass {
  /**
   * Create a new AgNotice instance.
   * @param {string} id - UUID of the agNotice
   * @param {string} title - title of the agNotice
   * @param {string} place - place of the agNotice
   * @param {date} agDate - place of the agNotice
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   */
  constructor({id, title, place, agDate, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
    this.place = place;
    this.agDate = agDate;
  }
  
  /****************************getters and setters for data validation***********************************/

  get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value !== 'string') {
      const error = new Error('Title must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMin2Max50(trimmedValue)) {
      const error = new Error('Invalid title: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._title = value;
  }

  get place() {
    return this._place;
  }

  set place(value) {
    if (typeof value !== 'string') {
      const error = new Error('Place must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMin2Max255(trimmedValue)) {
      const error = new Error('Invalid title: must be a string of minimum length 2 and maximum of 255.');
      error.statusCode = 400;
      throw error;
    }
    this._place = value;
  }

    
  get agDate() {
    return this._agDate;
  }
  
  set agDate(value) {
    if (!(value instanceof Date)) {
      const error = new Error('Invalid date');
      error.statusCode = 400;
      throw error;
    }
    this._agDate = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all ag notices from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allAgNotices] = await db.execute(`SELECT * FROM ag_notice`);
    return allAgNotices;
  }

  /**
   * Fetch a ag notice by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM ag_notice WHERE id = ?`, [id]);
   
    if (rows.length === 0) {
      const error = new Error('Ag notice not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag notice into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO ag_notice 
        (id, title, place, ag_date) 
        VALUES (?, ?, ?, ?)`, 
        [this.id, this.title, this.place, this.agDate]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Ag notice created successfully' };
  }
  
  /**
   * Update the current ag notice in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE ag_notice
        SET title = ?, place = ?, ag_date = ?
        WHERE id = ?`,
        [this.title, this.place, this.agDate, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Ag notice not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag notice updated successfully' };
  }

  /**
   * Delete a ag notice by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ag_notice WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Ag notice not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag notice deleted successfully' };
  }
}
