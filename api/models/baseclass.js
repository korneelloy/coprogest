/**
 * Base class for database models.
 * Provides common fields and validation logic.
 */

const { isValidUUIDv4 } = require('../util/validation');

module.exports = class BaseClass {
  /**
   * @param {string} id - UUID
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
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
    if (value !== null && !(value instanceof Date)) {
      const error = new Error('Invalid createdAt: must be a Date object or null.');
      error.statusCode = 400;
      throw error;
    }
    this._createdAt = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set updatedAt(value) {
    if (value !== null && !(value instanceof Date)) {
      const error = new Error('Invalid updatedAt: must be a Date object or null.');
      error.statusCode = 400;
      throw error;
    }
    this._updatedAt = value;
  }
}
