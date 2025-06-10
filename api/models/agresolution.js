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
   * @param {string} requiredMajority - majority needes to vote
   * @param {boolean} budget - budget related to this vote? 
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   * @param {string} idAgMinutes - Link to ag minutes
   * @param {string} idUnitGroup - Link to ag unit group
   * @param {string} idAgNotice - Link to ag notice

   */
  constructor({id, title, description, requiredMajority, budget, idAgMinutes, idUnitGroup, idAgNotice, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
    this.description = description;
    this.requiredMajority = requiredMajority;
    this.budget = budget;
    this.idAgMinutes = idAgMinutes;
    this.idUnitGroup = idUnitGroup;
    this.idAgNotice = idAgNotice;
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
    if (!(value instanceof String)) {
      const error = new Error('Invalid description: must be a string.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  get requiredMajority() {
    return this._requiredMajority;
  }

  set requiredMajority(value) {
    if (!isStringMin2Max20(value)) {
      const error = new Error('Invalid majority');
      error.statusCode = 400;
      throw error;
    }
    this._requiredMajority = value;
  }
    
  get budget() {
    return this._budget;
  }
  
  set budget(value) {
    if (!(value instanceof Boolean)) {
      const error = new Error('Invalid budget');
      error.statusCode = 400;
      throw error;
    }
    this._budget = value;
  }

  get idAgMinutes() {
    return this._idAgMinutes;
  }
  
  set idAgMinutes(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag minutes');
      error.statusCode = 400;
      throw error;
    }
    this._idAgMinutes = value;
  }


  get idUnitGroup() {
    return this._idUnitGroup;
  }
  
  set idUnitGroup(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id unit group');
      error.statusCode = 400;
      throw error;
    }
    this._idUnitGroup = value;
  }

  get idAgNotice() {
    return this._idAgNotice;
  }
  
  set idAgNotice(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag notice');
      error.statusCode = 400;
      throw error;
    }
    this._idAgNotice = value;
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
        [this.id, this.title, this.description, this.requiredMajority, this.budget, this.idAgMinutes, this.idUnitGroup, this.idAgNotice]
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
        [this.title, this.description, this.requiredMajority, this.budget, this.idAgMinutes, this.idUnitGroup, this.idAgNotice, this.id]
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
