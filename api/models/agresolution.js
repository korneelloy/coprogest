/**
 * Agresolution model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMin2Max50, isStringMin2Max20, isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgResolution extends BaseClass {
  /**
   * Create a new AgResolution instance.
   * @param {string} id - UUID of the ag resolution
   * @param {string} title - Title of the ag resolution
   * @param {string} description - Description
   * @param {string} required_majority - majority needes to vote
   * @param {boolean} budget - budget related to this vote? 
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   * @param {string} id_ag_minutes - Link to ag minutes
   * @param {string} id_unit_group - Link to ag unit group
   * @param {string} id_ag_notice - Link to ag notice

   */
  constructor({id, title, description, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
    this.description = description;
    this.required_majority = required_majority;
    this.budget = budget;
    this.id_ag_minutes = id_ag_minutes;
    this.id_unit_group = id_unit_group;
    this.id_ag_notice = id_ag_notice;
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

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value !== 'string') {
      const error = new Error('Invalid description: must be a string.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  get required_majority() {
    return this._required_majority;
  }

  set required_majority(value) {
    if (!isStringMin2Max20(value)) {
      const error = new Error('Invalid majority');
      error.statusCode = 400;
      throw error;
    }
    this._required_majority = value;
  }
    
  get budget() {
    return this._budget;
  }
  
  set budget(value) {
    if (typeof value !== 'boolean') {
      const error = new Error('Invalid budget');
      error.statusCode = 400;
      throw error;
    }
    this._budget = value;
  }

  get id_ag_minutes() {
    return this._id_ag_minutes;
  }
  
  set id_ag_minutes(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag minutes');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_minutes = value;
  }


  get id_unit_group() {
    return this._id_unit_group;
  }
  
  set id_unit_group(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id unit group');
      error.statusCode = 400;
      throw error;
    }
    this._id_unit_group = value;
  }

  get id_ag_notice() {
    return this._id_ag_notice;
  }
  
  set id_ag_notice(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag notice');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_notice = value;
  }
  /**********************************CRUD operations************************************/

  /**
   * Fetch all ag resolutions from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [agResolutions] = await db.execute(`SELECT * FROM ag_resolution;`);
    return agResolutions;
  }

  /**
   * Fetch a ag resolution by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM ag_resolution WHERE id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Ag resolution not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag resolution into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO ag_resolution 
        (id, title, description, required_majority, budget, id_ag_minutes, id_unit_group, id_ag_notice) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [this.id, this.title, this.description, this.required_majority, this.budget, this.id_ag_minutes, this.id_unit_group, this.id_ag_notice]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Ag resolution created successfully' };
  }
  
  /**
   * Update the ag resolution in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE ag_resolution
        SET title = ?, description = ?, required_majority = ?, budget = ?, id_ag_minutes = ?, id_unit_group = ?, id_ag_notice = ?
        WHERE id = ?`,
        [this.title, this.description, this.required_majority, this.budget, this.id_ag_minutes, this.id_unit_group, this.id_ag_notice, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Ag resolution not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag resolution updated successfully' };
  }

  /**
   * Delete a ag resolution by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ag_resolution WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Ag resolution not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag resolution deleted successfully' };
  }
}
