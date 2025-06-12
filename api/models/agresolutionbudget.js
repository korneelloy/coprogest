/**
 * AgResolutionBudget model class.
 * Provides data validation and database operatings.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgResolutionBudget extends BaseClass {
  /**
   * Create a new AgResolutionBudget instance.
   * @param {string} id - UUID of the ag resolution budget
   * @param {Number} budget_amount - Amount - can be null (if related to ag-resolution with budget=false)
   * @param {string} budget_type - enum {operating or exceptional} - not null
   * @param {Date|null} operating_budget_start - start date of operating budget - null if budget-type = exceptional
   * @param {Date|null} operating_budget_end - end date of operating budget - null if budget-type = exceptional
   * @param {Number} nb_of_instalments - in how many times the budget will be called?: 0 if we wait for the invoice / 1 : in one time: 2 in two times etc
   * @param {boolean} budget_recup_tenant - able to ask tenant to pay back?
   * @param {boolean} actif - actif or closed / closed by default 
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {string} id_budget_category - Link to budget category - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string} id_ag_resolution - Link to ag resolution - Foreign key - verification foreign key constraint handled in the CRUD operations

   */


  constructor({ id, budget_amount, budget_type, nb_of_instalments, budget_recup_tenant, id_budget_category, id_ag_resolution, actif = false, operating_budget_start = null, operating_budget_end = null, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.budget_amount = budget_amount;
    this.budget_type = budget_type;
    this.operating_budget_start = operating_budget_start;
    this.operating_budget_end = operating_budget_end;
    this.nb_of_instalments = nb_of_instalments;
    this.budget_recup_tenant = budget_recup_tenant;
    this.actif = actif;
    this.id_budget_category = id_budget_category;
    this.id_ag_resolution = id_ag_resolution;
  }
  
  /****************************getters and setters for data validation***********************************/


  get budget_amount() {
    return this._budget_amount;
  }
 
  set budget_amount(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Budget amount must be a valid number');
    }

    if (value < 0 || value > 9999999999999) {
      throw new RangeError('Budget amount must be between 0 and 9999999999999');
    }

    if (!Number.isInteger(value * 100)) {
      throw new RangeError('Budget amount must have at most 2 decimal places');
    }
    this._budget_amount = value;
  }

  get budget_type() {
    return this._budget_type;
  }

  set budget_type(value) {
    if (typeof value !== 'string') {
      const error = new Error('Budget type must be a string.');
      error.statusCode = 400;
      throw error;
    }

    if (value !== 'operating' && value !== 'exceptional') {
      const error = new Error('Invalid budget type: must be operating or exceptional.');
      error.statusCode = 400;
      throw error;
    }
    this._budget_type = value;
  }

  get operating_budget_start() {
    return this._operating_budget_start;
  }

  set operating_budget_start(value) {
    if (value !== null) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const error = new Error('Invalid operating_budget_start: must be a valid Date or null.');
        error.statusCode = 400;
        throw error;
      }
      this._operating_budget_start = date;
    } else {
      this._operating_budget_start = null;
    }
  }
  


  get operating_budget_end() {
    return this._operating_budget_end;
  }

  set operating_budget_end(value) {
    if (value !== null) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const error = new Error('Invalid operating_budget_end: must be a valid Date or null.');
        error.statusCode = 400;
        throw error;
      }
      this._operating_budget_end = date;
    } else {
      this._operating_budget_end = null;
    }
  }
  

  get nb_of_instalments() {
    return this._nb_of_instalments;
  }

  
  set nb_of_instalments(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Nb_of_instalments amount must be a valid number');
    }

    if (value < 0 || value > 999) {
      throw new RangeError('Nb_of_instalments amount must be between 0 and 999');
    }

    if (!Number.isInteger(value)) {
      throw new RangeError('Nb_of_instalments must be an integer');
    }
    this._nb_of_instalments = value;
  }
    
  get budget_recup_tenant() {
    return this._budget_recup_tenant;
  }
  
  set budget_recup_tenant(value) {
    if (typeof value !== 'boolean') {
      const error = new Error('Invalid budget_recup_tenant');
      error.statusCode = 400;
      throw error;
    }
    this._budget_recup_tenant = value;
  }

  get actif() {
    return this._actif;
  }
  
  set actif(value) {
    if (typeof value !== 'boolean') {
      const error = new Error('Invalid ag resolution budget actif status');
      error.statusCode = 400;
      throw error;
    }
    this._actif = value;
  }


  get id_budget_category() {
    return this._id_budget_category;
  }
  
  set id_budget_category(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id budget category');
      error.statusCode = 400;
      throw error;
    }
    this._id_budget_category = value;
  }


  get id_ag_resolution() {
    return this._id_ag_resolution;
  }
  
  set id_ag_resolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag resolution');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution = value;
  }

  /**********************************CRUD operatings************************************/

  /**
   * Fetch all ag resolution budgets from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [agResolutionBudgets] = await db.execute(`SELECT * FROM ag_resolution_budget;`);
    return agResolutionBudgets;
  }

  /**
   * Fetch a ag resolution budget by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM ag_resolution_budget WHERE id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Ag resolution budget not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag resolution budget into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_resolution_budget
          (id, budget_amount, budget_type, nb_of_instalments, budget_recup_tenant, id_budget_category, id_ag_resolution, actif, operating_budget_start, operating_budget_end)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [this.id, this.budget_amount, this.budget_type, this.nb_of_instalments, this.budget_recup_tenant, this.id_budget_category, this.id_ag_resolution, this.actif, this.operating_budget_start, this.operating_budget_end]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Ag resolution budget created successfully' };
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
   * Update the ag resolution budget in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE ag_resolution_budget
          SET budget_amount = ?, budget_type = ?, nb_of_instalments = ?, budget_recup_tenant = ?, id_budget_category = ?, id_ag_resolution = ?, actif = ?, operating_budget_start = ?, operating_budget_end = ?
          WHERE id = ?`,
          [this.budget_amount, this.budget_type, this.nb_of_instalments, this.budget_recup_tenant, this.id_budget_category, this.id_ag_resolution, this.actif, this.operating_budget_start, this.operating_budget_end, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Ag resolution budget not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag resolution updated successfully' };
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
   * Delete a ag resolution budget _by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ag_resolution_budget WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Ag resolution budget not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag resolution budget deleted successfully' };
  }
}
