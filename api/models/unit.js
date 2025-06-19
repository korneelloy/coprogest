/**
 * Unit model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50, isNullOrStringMax255, isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class Unit extends BaseClass {
  /**
   * Create a new unit instance.
   * @param {string} id - UUID of the unit
   * @param {string} name - Name of the unit
   * @param {number} shares - Shares 
   * @param {string|null} description - Optional description
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {string} id_person - UUID of the person - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string|null} name_person - Optional, loaded via JOIN
  */
  constructor({id, name, id_person, shares, description = null, createdAt = null, updatedAt = null, name_person = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.id_person = id_person;
    this.shares = shares;
    this.description = description;
    this.name_person = name_person;
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
    this._name = value;
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
    if (!isNullOrStringMax255(value)) {
      const error = new Error('Invalid description: must be null or a string between 2 and 255 characters.');
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
    const [allUnits] = await db.execute(`SELECT 
      unit.id,
      unit.name,
      unit.id_person,
      unit.shares,
      unit.description, 
      unit.created_at, 
      unit.updated_at, 
      person.first_name as owner_first_name,
      person.last_name as owner_last_name,
      person.email as owner_email
      FROM unit
      LEFT JOIN person ON unit.id_person = person.id
      ORDER BY unit.name
      ;`);
    return allUnits;
  }

  /**
   * Fetch a unit by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`
      SELECT 
        unit.id,
        unit.name,
        unit.id_person,
        unit.shares,
        unit.description, 
        unit.created_at, 
        unit.updated_at, 
        person.first_name as owner_first_name,
        person.last_name as owner_last_name,
        person.email as owner_email
      FROM unit
      LEFT JOIN person ON unit.id_person = person.id
      WHERE unit.id = ?`, [id]);

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
    try {
      const [result] = await db.execute(
        `INSERT INTO unit 
          (id, name, id_person, shares, description) 
          VALUES (?, ?, ?, ?, ?)`, 
          [this.id, this.name, this.id_person, this.shares, this.description]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Unit created successfully' };
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
   * Update the current unit in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE unit
          SET name = ?, id_person = ?, shares = ?, description = ?
          WHERE id = ?`,
          [this.name, this.id_person, this.shares, this.description, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Unit not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Unit updated successfully' };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }
}
