/**
 * Role model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const BaseClass = require('./baseclass');

module.exports = class Role extends BaseClass {
  /**
   * Create a new Role instance.
   * @param {string} id - UUID of the person
   * @param {string} name - the name of the role
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({id, name, createdAt = null, updatedAt = null}) {
    super({ id, createdAt, updatedAt });
    this.name = name;
  }
  
  /****************************getters and setters for data validation***********************************/

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all roles from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allRoles] = await db.execute(`SELECT * FROM role;`);
    return allRoles;
  }

  /**
   * Fetch a role by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM role WHERE id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Role not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
}
