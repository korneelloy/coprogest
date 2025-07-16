/**
 * Ag minute model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgMinute extends BaseClass {
  /**
   * Create a new AgNotice instance.
   * @param {string} id - UUID of the agNotice
   * @param {Date} minutes_date - date of the agNotice - not null
   * @param {string} place - place of the agNotice - not null
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({id, minutes_date, place, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.minutes_date = minutes_date;
    this.place = place;
  }
  
  /****************************getters and setters for data validation***********************************/

  
  get minutes_date() {
    return this._minutes_date;
  }

  set minutes_date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid date');
      error.statusCode = 400;
      throw error;
    }  
    this._minutes_date = date;
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

   
  /**********************************CRUD operations************************************/

  /**
   * Fetch all ag minutes from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allAgMinutes] = await db.execute(`SELECT DISTINCT
      ag_minutes.*,
      ag_notice.title as ag_notice_title 
      
      FROM ag_minutes 
      
      LEFT JOIN ag_resolution ON ag_minutes.id = ag_resolution.id_ag_minutes
      LEFT JOIN ag_notice ON ag_notice.id = ag_resolution.id_ag_notice

      ORDER BY minutes_date DESC`);
    return allAgMinutes;
  }

  /**
   * Fetch a ag minute by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM ag_minutes WHERE id = ?`, [id]);
   
    if (rows.length === 0) {
      const error = new Error('Ag minute not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
   /**
   * Insert the current ag minute into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO ag_minutes 
        (id, minutes_date, place) 
        VALUES (?, ?, ?)`, 
      [this.id, this.minutes_date, this.place]
    );

    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { 
      message: 'Ag minutes created successfully',
      id: this.id 
    };
  }
  
  /**
   * Update the current ag minute in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE ag_minutes
        SET minutes_date = ?, place = ?
        WHERE id = ?`,
        [this.minutes_date, this.place, this.id]
      );
    if (result.affectedRows === 0) {
      const error = new Error('Ag minute not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag minute updated successfully' };    
  }

  /**
   * Delete an ag minute by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ag_minutes WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Ag minute not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag minute deleted successfully' };
  }
}
