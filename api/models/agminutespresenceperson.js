/**
 * agMinutes presence/person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isStringMax20, isNullOrStringMax50 } = require('../util/validation');


module.exports = class AgMinutesPresencePerson  {
  /**
   * Create a agminutes presence/person instance.
   * @param {string} id_ag_minutes - UUID of the agminutes
   * @param {string} id_person - UUID of the person
   * @param {string} presence - presence status - not null - enum {present, absent, represented}
   * @param {string|null} represented_by - if owner not present

  */
  constructor({id_ag_minutes, id_person, presence, represented_by=null}) {
    this.id_ag_minutes = id_ag_minutes;
    this.id_person = id_person;
    this.presence = presence;
    this.represented_by = represented_by;

  }
  
  /****************************getters and setters for data validation***********************************/

  get id_ag_minutes() {
    return this._id_ag_minutes;
  }

  set id_ag_minutes(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_ag_minutes');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_minutes = value;
  }

  get id_person() {
    return this._id_person;
  }
  
  set id_person(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_person');
      error.statusCode = 400;
      throw error;
    }
    this._id_person = value;
  }

  get presence() {
    return this._presence;
  }
 
  set presence(value) {
    if (!isStringMax20(value) || !["present", "absent", "represented"].includes(value)) {
      const error = new Error('Invalid presence');
      error.statusCode = 400;
      throw error;
    }
    this._presence = value;
  }

  get represented_by() {
    return this._represented_by;
  }
 
  set represented_by(value) {
    if (!isNullOrStringMax50(value)) {
      const error = new Error('Invalid represented_by status');
      error.statusCode = 400;
      throw error;
    }
    this._represented_by = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all agminutes presence/persons from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM ag_minutes_presence_person;`);
    return all;
  }


  /**
    * Fetch all agminutes presence/persons from the database.
    * @returns {Promise<Object[]>}
    */
  static async getByMinutes(agMinutesId) {
    const [all] = await db.execute(`SELECT * FROM ag_minutes_presence_person WHERE id_ag_minutes = ?`, [agMinutesId]);
    return all;
  }

  /**
   * Fetch an agminutes presence/person by ID.
   * @param {string} id_ag_minutes
   * @param {string} id_person
   * @returns {Promise<Object>}
   */
  static async get(id_ag_minutes, id_person) {
    const [rows] = await db.execute(`SELECT * FROM ag_minutes_presence_person WHERE id_ag_minutes = ? AND id_person = ?`, [id_ag_minutes, id_person]);
    if (rows.length === 0) {
      const error = new Error('agminutes presence/person not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current agminutes presence/person into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_minutes_presence_person 
          (id_ag_minutes, id_person, presence, represented_by) 
          VALUES (?, ?, ?, ?)`, 
          [this.id_ag_minutes, this.id_person, this.presence, this.represented_by]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'agminutes presence/person created successfully',
        id: this.id_ag_minutes 
      };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('Duplicate entry: this unit is already in this group');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current agminutes presence/person in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE ag_minutes_presence_person
          SET presence = ?, represented_by = ?
          WHERE id_ag_minutes = ? AND id_person = ?`,
          [this.presence, this.represented_by ?? null, this.id_ag_minutes, this.id_person]
        );

      if (result.affectedRows === 0) {
        const error = new Error('agminutes presence/person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'agminutes presence/person updated successfully' };
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
    * Delete a agminutes presence/person by minutes id.
    * @param {string} id_ag_minutes
    * @returns {Promise<Object>}
    */
   static async deleteByMinutes (id_ag_minutes) {
    const [result] = await db.execute(`DELETE FROM ag_minutes_presence_person WHERE id_ag_minutes = ?`, [id_ag_minutes]);
    return {
      message: `agminutes presence/person deleted successfully (${result.affectedRows} deleted)`,
    };
  }

  /**
     * Delete a agminutes presence/person by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_ag_minutes, id_person) {
      const [result] = await db.execute(`DELETE FROM ag_minutes_presence_person WHERE id_ag_minutes = ? AND id_person = ?`, [id_ag_minutes, id_person]);
      if (result.affectedRows === 0) {
        const error = new Error('agminutes presence/person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'agminutes presence/person deleted successfully' };
    }
  
}
