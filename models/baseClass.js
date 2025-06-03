const isValidUUIDv4 = require('../util/validation');

module.exports = class baseClass {
  constructor({id, createdAt = null, updatedAt = null}) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  
  /*getters and setters for data validation*/

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
}
