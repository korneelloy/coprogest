/**
 * Ag resolution call date model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');


module.exports = class AgResolutionBudgetCallDate  {
  /**
   * Create a new Ag resolution-call date instance.
   * @param {string} id_ag_resolution_budget - UUID of the ag resolution
   * @param {string} id_call_date - UUID of the call date
  */
  constructor({id_ag_resolution_budget, id_call_date}) {
    this.id_ag_resolution_budget = id_ag_resolution_budget;
    this.id_call_date = id_call_date;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id_ag_resolution_budget() {
    return this._id_ag_resolution_budget;
  }

  set id_ag_resolution_budget(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_ag_resolution_budget');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution_budget = value;
  }

  get id_call_date() {
    return this._id_call_date;
  }
  
  set id_call_date(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_call_date');
      error.statusCode = 400;
      throw error;
    }
    this._id_call_date = value;
  }
  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all Ag resolution-calls from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM ag_resolution_budget_call_date;`);
    return all;
  }

  /**
   * Insert the current Ag resolution-call into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_resolution_budget_call_date
          (id_ag_resolution_budget, id_call_date) 
          VALUES (?, ?)`, 
          [this.id_ag_resolution_budget, this.id_call_date]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Ag resolution-call date created successfully' };
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
     * Delete an Ag resolution-call by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_ag_resolution_budget, id_call_date) {
      const [result] = await db.execute(`DELETE FROM ag_resolution_budget_call_date WHERE id_ag_resolution_budget = ? AND id_call_date = ?`, [id_ag_resolution_budget, id_call_date]);
      if (result.affectedRows === 0) {
        const error = new Error('Ag resolution-call date not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag resolution-call date deleted successfully' };
    }
  
}
