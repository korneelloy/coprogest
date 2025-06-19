/**
 * Budget category model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class BudgetCategory extends BaseClass {
  /**
   * Create a new budget category instance.
   * @param {string} id - UUID of the budget category
   * @param {string} name - name of the budget category - should be unique (uniqueness handled in CRUD operations, not in setter) - not null
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({id, name, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
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

  /**********************************CRUD operations************************************/

  /**
   * Fetch all budget categories from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allBudgetCategories] = await db.execute(`SELECT * FROM budget_category`);
    return allBudgetCategories;
  }

  /**
   * Fetch a budget category by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM budget_category WHERE id = ?`, [id]);
   
    if (rows.length === 0) {
      const error = new Error('Budget category not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
   /**
   * Insert the current budget category into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO budget_category 
          (id, name) 
          VALUES (?, ?)`, 
        [this.id, this.name]
      );

      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }

      return { message: 'Budget category created successfully' };

    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('The budget category already exists.');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }
  
  /**
   * Update the current budget category in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE budget_category
          SET name = ?
          WHERE id = ?`,
          [this.name, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Budget category not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Budget category updated successfully' };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('The budget category already exists.');
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }

  /**
   * Delete a budget category by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM budget_category WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Budget category not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Budget category deleted successfully' };
  }
}
