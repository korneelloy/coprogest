/**
 * Ag notice/person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');


module.exports = class AgNoticeSentPerson {
  /**
   * Create a new Ag notice/person instance.
   * @param {string} id_person - UUID of the person
   * @param {string} id_ag_notice - UUID of the Ag notice
  */
  constructor({id_person, id_ag_notice}) {
    this.id_person = id_person;
    this.id_ag_notice = id_ag_notice;
  }
  
  /****************************getters and setters for data validation***********************************/

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
  get id_ag_notice() {
    return this._id_ag_notice;
  }

  set id_ag_notice(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_ag_notice');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_notice = value;
  }
  /**********************************CRUD operations************************************/

  /**
   * Fetch all Ag notice/persons from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [all] = await db.execute(`SELECT * FROM ag_notice_sent_person;`);
    return all;
  }

  /**
   * Insert the current Ag notice/person into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_notice_sent_person
          (id_ag_notice, id_person) 
          VALUES (?, ?)`, 
          [this.id_ag_notice, this.id_person]
        );
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'Ag notice/person created successfully',
        id: this.id 
      };
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
     * Delete an Ag notice/person by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id_person, id_ag_notice) {
      const [result] = await db.execute(`DELETE FROM ag_notice_sent_person WHERE id_person = ? AND id_ag_notice = ?`, [id_person, id_ag_notice]);
      if (result.affectedRows === 0) {
        const error = new Error('Ag notice/person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag notice/person deleted successfully' };
    }
  
}
