/**
 * AgResolutionBudget model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgResolutionBudget extends BaseClass {
  /**
   * Create a new AgResolutionBudget instance.
   * @param {string} id - UUID of the ag resolution budget
   * @param {Number} budgetAmount - Amount
   * @param {string} budgetType - enum: operating or exceptional
   * @param {Date|null} operationBudgetStart - start date of operating budget 
   * @param {Date|null} operationBudgetEnd - end date of operating budget
   * @param {Number} nbOfInstalments - in how many times the budget will be called?
   * @param {boolean} budgetRecupTenant - able to ask tenant to pay back
   * @param {boolean} actif - actif or closed / closed by default 
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
   * @param {string} idBudgetCategory - Link to budget category
   * @param {string} idAgResolution - Link to ag resolution

   */


  constructor({ id, budgetAmount, budgetType, nbOfInstalments, budgetRecupTenant, idBudgetCategory, idAgResolution, actif = false, operationBudgetStart = null, operationBudgetEnd = null, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.budgetAmount = budgetAmount;
    this.budgetType = budgetType;
    this.operationBudgetStart = operationBudgetStart;
    this.operationBudgetEnd = operationBudgetEnd;
    this.nbOfInstalments = nbOfInstalments;
    this.budgetRecupTenant = budgetRecupTenant;
    this.actif = actif;
    this.idBudgetCategory = idBudgetCategory;
    this.idAgResolution = idAgResolution;
  }
  
  /****************************getters and setters for data validation***********************************/


  get budgetAmount() {
    return this._budgetAmount;
  }
 
  set budgetAmount(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Budget amount must be a valid number');
    }

    if (value < 0 || value > 9999999999999) {
      throw new RangeError('Budget amount must be between 0 and 9999999999999');
    }

    if (!Number.isInteger(value * 100)) {
      throw new RangeError('Budget amount must have at most 2 decimal places');
    }
    this._budgetAmount = value;
  }

  get budgetType() {
    return this._budgetType;
  }

  set budgetType(value) {
    if (typeof value !== 'string') {
      const error = new Error('Budget type must be a string.');
      error.statusCode = 400;
      throw error;
    }

    if (value !== 'operating' || value !== 'exceptional') {
      const error = new Error('Invalid budget type: must be operating pr exceptional.');
      error.statusCode = 400;
      throw error;
    }
    this._budgetType = value;
  }

  get operationBudgetStart() {
    return this._operationBudgetStart;
  }

  set operationBudgetStart(value) {
    if ((value !== null) && !(value instanceof Date)) {
      const error = new Error('Invalid operation_budget_start: must be a date or null.');
      error.statusCode = 400;
      throw error;
    }
    this._operationBudgetStart = value;
  }

  get operationBudgetEnd() {
    return this._operationBudgetEnd;
  }

  set operationBudgetEnd(value) {
    if ((value !== null) && !(value instanceof Date)) {
      const error = new Error('Invalid operation_budget_end: must be a date or null.');
      error.statusCode = 400;
      throw error;
    }
    this._operationBudgetEnd = value;
  }

  get nbOfInstalments() {
    return this._nbOfInstalments;
  }

  
  set nbOfInstalments(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Nb_of_instalments amount must be a valid number');
    }

    if (value < 0 || value > 999) {
      throw new RangeError('Nb_of_instalments amount must be between 0 and 999');
    }

    if (!Number.isInteger(value)) {
      throw new RangeError('Nb_of_instalments must be an integer');
    }
    this._nbOfInstalments = value;
  }
    
  get budgetRecupTenant() {
    return this._budgetRecupTenant;
  }
  
  set budgetRecupTenant(value) {
    if (!(value instanceof Boolean)) {
      const error = new Error('Invalid budget_recup_tenant');
      error.statusCode = 400;
      throw error;
    }
    this._budgetRecupTenant = value;
  }

  get actif() {
    return this._actif;
  }
  
  set actif(value) {
    if (!(value instanceof Boolean)) {
      const error = new Error('Invalid ag resolution budget actif status');
      error.statusCode = 400;
      throw error;
    }
    this._actif = value;
  }


  get idBudgetCategory() {
    return this._idBudgetCategory;
  }
  
  set idBudgetCategory(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id budget category');
      error.statusCode = 400;
      throw error;
    }
    this._idBudgetCategory = value;
  }


  get idAgResolution() {
    return this._idAgResolution;
  }
  
  set idAgResolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag resolution');
      error.statusCode = 400;
      throw error;
    }
    this._idAgResolution = value;
  }

  /**********************************CRUD operations************************************/

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
    const [result] = await db.execute(
      `INSERT INTO ag_resolution_budget
        (id, budget_amount, budget_type, nb_of_instalments, budget_recup_tenant, id_budget_category, id_ag_resolution, actif, operation_budget_start, operation_budget_end)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [this.id, this.budgetAmount, this.budgetType, this.nbOfInstalments, this.budgetRecupTenant, this.idBudgetCategory, this.idAgResolution, this.actif, this.operationBudgetStart, this.operationBudgetEnd]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { mssage: 'Ag resolution budget created successfully' };
  }
  
  /**
   * Update the ag resolution budget in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE ag_resolution_budget
        SET budget_amount = ?, budget_type = ?, nb_of_instalments = ?, budget_recup_tenant = ?, id_budget_category = ?, id_ag_resolution = ?, actif = ?, operation_budget_start = ?, operation_budget_end = ?
        WHERE id = ?`,
        [this.budgetAmount, this.budgetType, this.nbOfInstalments, this.budgetRecupTenant, this.idBudgetCategory, this.idAgResolution, this.actif, this.operationBudgetStart, this.operationBudgetEnd, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Ag resolution budget budget not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag resolution updated successfully' };
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
