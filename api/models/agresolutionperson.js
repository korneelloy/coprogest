/**
 * agresolution/person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isStringMax20 } = require('../util/validation');


module.exports = class AgResolutionPerson  {
  /**
   * Create a new ag_resolution / person instance.
   * @param {string} id_ag_resolution - UUID of the agresolution
   * @param {string} id_person - UUID of the person
   * @param {string} vote - majority needed to vote - not null - enum {for, against, abstention}

  */
  constructor({id_ag_resolution, id_person, vote }) {
    this.id_ag_resolution = id_ag_resolution;
    this.id_person = id_person;
    this.vote = vote;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id_ag_resolution() {
    return this._id_ag_resolution;
  }

  set id_ag_resolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalidid_ag_resolution');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution = value;
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

  get vote() {
    return this._vote;
  }
 
  set vote(value) {
    if (!isStringMax20(value) || !["for", "against", "abstention"].includes(value)) {
      const error = new Error('Invalid vote');
      error.statusCode = 400;
      throw error;
    }
    this._vote = value;
  }

  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all ag_resolution / persons from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM ag_resolution_person;`);
    return all;
  }

   /**
   * Fetch a ag_resolution / person  by ID.
   * @param {string} id_ag_resolution
   * @param {string} id_person
   * @returns {Promise<Object>}
   */
  static async get(id_ag_resolution, id_person) {
    const [rows] = await db.execute(`SELECT * FROM ag_resolution_person WHERE id_ag_resolution = ? AND id_person = ?`, [id_ag_resolution, id_person]);
   
    if (rows.length === 0) {
      const error = new Error('ag_resolution / person not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag_resolution / person into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_resolution_person 
          (id_ag_resolution, id_person, vote) 
          VALUES (?, ?, ?)`, 
          [this.id_ag_resolution, this.id_person, this.vote]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return {
        message: 'ag_resolution / person created successfully' ,
        id: this.id
      };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('Duplicate entry: this ag_resolution or person is already in this group');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current ag_resolution / person  in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE ag_resolution_person 
          SET vote = ?
          WHERE id_ag_resolution = ? AND id_person = ?`,
          [this.vote, this.id_ag_resolution, this.id_person]
        );

      if (result.affectedRows === 0) {
        const error = new Error('ag_resolution / person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'ag_resolution / person updated successfully' };
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
     * Delete a ag_resolution / person by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_ag_resolution, id_person) {
      const [result] = await db.execute(`DELETE FROM ag_resolution_person WHERE id_ag_resolution = ? AND id_person = ?`, [id_ag_resolution, id_person]);
      if (result.affectedRows === 0) {
        const error = new Error('ag_resolution / person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'ag_resolution / person deleted successfully' };
    }
  
}
