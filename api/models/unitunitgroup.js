/**
 * Unit-UnitGroup model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');


module.exports = class UnitUnitGroup  {
  /**
   * Create a new unit - unit group instance.
   * @param {string} id_unit - UUID of the unit
   * @param {string} id_unit_group - UUID of the unit group
   * @param {number} adjusted_shares - Shares 
  */
  constructor({id_unit, id_unit_group, adjusted_shares }) {
    this.id_unit = id_unit;
    this.id_unit_group = id_unit_group;
    this.adjusted_shares = adjusted_shares;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id_unit() {
    return this._id_unit;
  }

  set id_unit(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_unit');
      error.statusCode = 400;
      throw error;
    }
    this._id_unit = value;
  }

  get id_unit_group() {
    return this._id_unit_group;
  }
  
  set id_unit_group(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_unit_group');
      error.statusCode = 400;
      throw error;
    }
    this._id_unit_group = value;
  }

  get adjusted_shares() {
    return this._adjusted_shares;
  }
 
  set adjusted_shares(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new TypeError('Adjusted_shares must be a valid number');
    }

    if (value < 0 || value > 9999) {
      throw new RangeError('Adjusted_shares must be between 0 and 9999');
    }

    if (!Number.isInteger(value * 100)) {
      throw new RangeError('Adjusted_shares must have at most 2 decimal places');
    }
    this._adjusted_shares = value;
  }

  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all unit  unit groups from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allUnitUnitGroups] = await db.execute(`SELECT 
      unit_unit_group.id_unit_group,
      unit_unit_group.id_unit,
      unit_unit_group.adjusted_shares,
      unit_group.name as unit_group_name
      FROM unit_unit_group 
      LEFT JOIN unit_group ON unit_unit_group.id_unit_group = unit_group.id
      ;`);
    return allUnitUnitGroups;
  }

  /**
   * Fetch all unit  unit groups from the database for one particular unit.
   * @returns {Promise<Object[]>}
   */
  static async fetchAllByUnit(id) {
    const [allUnitUnitGroupsByUnit] = await db.execute(`SELECT 
      unit_unit_group.id_unit_group,
      unit_unit_group.adjusted_shares,
      unit_group.name as unit_group_name
      FROM unit_unit_group 
      LEFT JOIN unit_group ON unit_unit_group.id_unit_group = unit_group.id
      WHERE id_unit = ?;`, [id]);
    return allUnitUnitGroupsByUnit;
  }


  /**
   * Fetch all unit  unit groups from the database for one particular unit group
   * @returns {Promise<Object[]>}
   */
  static async fetchAllByUnitGroup(id) {
    const [allUnitUnitGroupsByUnitGroup] = await db.execute(`SELECT 
      unit_unit_group.id_unit_group,
      unit_unit_group.adjusted_shares,
      unit_unit_group.id_unit,
      unit.id as unit_id,
      unit.name as unit_name,
      unit.shares as unit_shares,
      unit_group.id as unit_group_id,
      unit_group.name as unit_group_name,
      unit_group.description as unit_group_description,
      unit_group.special_shares as unit_group_special_shares
      FROM unit_unit_group 
      LEFT JOIN unit ON unit_unit_group.id_unit = unit.id
      LEFT JOIN unit_group ON unit_unit_group.id_unit_group = unit_group.id

      WHERE id_unit_group = ?;`, [id]);
    return allUnitUnitGroupsByUnitGroup;
  }


  /**
   * Fetch a unit/unit group by ID.
   * @param {string} id_unit
   * @param {string} id_unit_group
   * @returns {Promise<Object>}
   */
  static async get(id_unit, id_unit_group) {
    const [rows] = await db.execute(`SELECT * FROM unit_unit_group WHERE id_unit = ? AND id_unit_group = ?`, [id_unit, id_unit_group]);
   
    if (rows.length === 0) {
      const error = new Error('Unit / unit group not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current unit / unit group into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO unit_unit_group 
          (id_unit, id_unit_group, adjusted_shares) 
          VALUES (?, ?, ?)`, 
          [this.id_unit, this.id_unit_group, this.adjusted_shares]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Unit Unit group created successfully' };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      if (err.code === 'ER_DUP_ENTRY') {
        const error = new Error('Duplicate entry: this unit is already in this group');
        error.statusCode = 409;
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
        `UPDATE unit_unit_group
          SET adjusted_shares = ?
          WHERE id_unit = ? AND id_unit_group = ?`,
          [this.adjusted_shares ?? null, this.id_unit, this.id_unit_group]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Unit unit group not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Unit / unit group updated successfully' };
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
    * Delete a unit / unitgroup by ID.
    * @param {string} id_unit
    * @returns {Promise<Object>}
    */
  static async deleteAllByUnit(id_unit) {
    const [result] = await db.execute(`DELETE FROM unit_unit_group WHERE id_unit = ?`, [id_unit]);
    if (result.affectedRows === 0) {
      const error = new Error('Unit/unit group not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Unit / Unitgroups deleted successfully' };
  }

  /**
    * Delete a unit / unitgroup by ID.
    * @param {string} id_unit_group
    * @returns {Promise<Object>}
    */
  static async deleteAllByUnitGroup(id_unit_group) {
    console.log("id_unit_group", id_unit_group);
    const [result] = await db.execute(`DELETE FROM unit_unit_group WHERE id_unit_group = ?`, [id_unit_group]);
    
    return {
      message: `Unit / Unitgroups deleted successfully (${result.affectedRows} deleted)`,
    };
  }

  /**
     * Delete a unit / unitgroup by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_unit, id_unit_group) {
      const [result] = await db.execute(`DELETE FROM unit_unit_group WHERE id_unit = ? AND id_unit_group = ?`, [id_unit, id_unit_group]);
      if (result.affectedRows === 0) {
        const error = new Error('Unit/unit group not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Unit / Unitgroup deleted successfully' };
    }
  
}
