/**
 * Ag notice model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50, isStringMax255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgNotice extends BaseClass {
  /**
   * Create a new AgNotice instance.
   * @param {string} id - UUID of the agNotice
   * @param {string} title - title of the agNotice - should be unique (uniqueness handled in CRUD operations, not in setter) - not null
   * @param {string} place - place of the agNotice - not null
   * @param {Date} ag_date - date of the agNotice - not null
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({id, title, place, ag_date, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
    this.place = place;
    this.ag_date = ag_date;
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

    if (!isStringMax50(trimmedValue)) {
      const error = new Error('Invalid title: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._title = trimmedValue;
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

    if (!isStringMax255(trimmedValue)) {
      const error = new Error('Invalid place: must be a string of minimum length 2 and maximum of 255.');
      error.statusCode = 400;
      throw error;
    }
    this._place = trimmedValue;
  }

    
  get ag_date() {
    return this._ag_date;
  }

  set ag_date(value) {
    const agDate = new Date(value);
    if (isNaN(agDate.getTime())) {
      const error = new Error('Invalid date');
      error.statusCode = 400;
      throw error;
    }  
    this._ag_date = agDate;
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
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_notice 
          (id, title, place, ag_date) 
          VALUES (?, ?, ?, ?)`, 
        [this.id, this.title, this.place, this.ag_date]
      );

      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }

      return { 
        message: 'Ag notice created successfully',
        id: this.id 
      };

    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('The combination Title-date already exists.');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current ag notice in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE ag_notice
          SET title = ?, place = ?, ag_date = ?
          WHERE id = ?`,
          [this.title, this.place, this.ag_date, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Ag notice not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag notice updated successfully' };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('The combination Title-date already exists.');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }

  /**
   * Delete an ag notice by ID.
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
