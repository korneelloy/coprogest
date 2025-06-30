/**
 * Unitgroup model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50, isNullOrString } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class Unitgroup extends BaseClass {
  /**
   * Create a new unitgroup instance.
   * @param {string} id - UUID of the unit group
   * @param {string} name - Name of the unit group
   * @param {string|null} description - Optional description
   * @param {boolean} special_shares - Special shares involved in this group?, false by default
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {[][]|null} selectedUnits - list of units (with id and ajusted shares) - handled by associatif table
   * 
   */
  constructor({id, name, description = null, special_shares = false, createdAt = null, updatedAt = null, selectedUnits = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.description = description;
    this.special_shares = special_shares;
    this.selectedUnits = selectedUnits;
  }
  
  /****************************getters and setters for data validation***********************************/

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      const error = new Error('Name must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMax50(trimmedValue)) {
      const error = new Error('Invalid name: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._name = trimmedValue;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (!isNullOrString(value)) {
      const error = new Error('Invalid description: must be a string or null.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  get special_shares() {
    return this._special_shares;
  }

  set special_shares(value) {
    if (value !== 0 && value !== 1) {
      const error = new Error('Invalid special_shares');
      error.statusCode = 400;
      throw error;
    }
    this._special_shares = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all unitgroups from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allUnitGroups] = await db.execute(`SELECT * FROM unit_group;`);
    return allUnitGroups;
  }

  /**
   * Fetch a unitgroup by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM unit_group WHERE id = ?`, [id]);
   
    if (rows.length === 0) {
      const error = new Error('Unitgroup not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
    /**
   * Insert the current unitgroup into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO unit_group 
        (id, name, description, special_shares) 
        VALUES (?, ?, ?, ?)`, 
      [this.id, this.name, this.description, this.special_shares]
    );    
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { 
      message: 'Unit group created successfully',
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
   * Update the current unitgroup in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE unit_group
        SET name = ?, description = ?, special_shares = ?
        WHERE id = ?`,
        [this.name, this.description, this.special_shares, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Unitgroup not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Unitgroup updated successfully' };
  }

  /**
   * Delete a unitgroup by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM unit_group WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Unitgroup not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Unitgroup deleted successfully' };
  }
}
