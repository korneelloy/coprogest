/**
 * Unit model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMin2Max50, isNullOrString } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class Unit extends BaseClass {
  /**
   * Create a new unit instance.
   * @param {string} id - UUID of the unit
   * @param {string} name - Name of the unit
   * @param {number} shares- Shares 
   * @param {string|null} description - Optional description
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   */
  constructor({id, name, shares= null, description = null, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.shares = shares;
    this.description = description;
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

    if (!isStringMin2Max50(trimmedValue)) {
      const error = new Error('Invalid name: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._name = value;
  }

  get shares() {
    return this._shares;
  }
 
  set shares(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Shares must be a valid number');
    }

    if (value < 0 || value > 9999) {
      throw new RangeError('Shares must be between 0 and 9999');
    }

    if (!Number.isInteger(value * 100)) {
      throw new RangeError('Shares must have at most 2 decimal places');
    }
    this._shares = value;
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

  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all units from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allUnits] = await db.execute(`SELECT * FROM unit;`);
    return allUnits;
  }

  /**
   * Fetch a unit by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM unit WHERE id = ?`, [id]);
   
    if (rows.length === 0) {
      const error = new Error('Unit not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current unit into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO unit 
        (id, name, shares, description) 
        VALUES (?, ?, ?, ?)`, 
        [this.id, this.name, this.shares, this.description]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Unit created successfully' };
  }
  
  /**
   * Update the current unit in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE unit
        SET name = ?, shares = ?, description = ?
        WHERE id = ?`,
        [this.name, this.shares, this.description, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Unit not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Unit updated successfully' };
  }
}
