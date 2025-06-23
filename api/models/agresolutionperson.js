/**
 * agresolution/person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isStringMax20 } = require('../util/validation');


module.exports = class AgResolutionPerson  {
  /**
   * Create a new unit - unit group instance.
   * @param {string} id_ag_resolution - UUID of the agresolution
   * @param {string} id_person - UUID of the person
   * @param {string} vote - majority needed to vote - not null - enum {for, against, abstention}

  */
  constructor({id_ag_resolution, id_person, vote }) {
    this.id_ag_resolution = id_ag_resolution;
    this.id_person = id_person;
    this.vote = vote;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id_ag_resolution() {
    return this._id_ag_resolution;
  }

  set id_ag_resolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalidid_ag_resolution');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution = value;
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

  get vote() {
    return this._vote;
  }
 
  set vote(value) {
    if (!isStringMax20(value) || !["for", "against", "abstention"].includes(value)) {
      const error = new Error('Invalid vote');
      error.statusCode = 400;
      throw error;
    }
    this._vote = value;
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
      unit.name as unit_name,
      unit.shares as unit_shares
      FROM unit_unit_group 
      LEFT JOIN unit ON unit_unit_group.id_unit = unit.id
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
    * @param {string} id
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
