/**
 * Base class for database models.
 * Provides common fields and validation logic.
 */

const { isValidUUIDv4 } = require('../util/validation');

module.exports = class BaseClass {
  /**
   * @param {string} id - UUID
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   */
  constructor({id, createdAt = null, updatedAt = null}) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  /****************************getters and setters for data validation***********************************/

  get id() {
    return this._id;
  }

  set id(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id');
      error.statusCode = 400;
      throw error;
    }
    this._id = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    if (value === null) {
      this._createdAt = null;
    } else {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const error = new Error('Invalid createdAt: must be a valid date or null.');
        error.statusCode = 400;
        throw error;
      }
      this._createdAt = date;
    }
  }
  

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(value) {
    if (value === null) {
      this._updatedAt = null;
    } else {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const error = new Error('Invalid updatedAt: must be a valid date or null.');
        error.statusCode = 400;
        throw error;
      }
      this._updatedAtt = date;
    }
  }
}
