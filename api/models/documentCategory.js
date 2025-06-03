/**
 * Document category model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMin2Max50 } = require('../util/validation');
const BaseClass = require('./baseClass');


module.exports = class DocumentCategory extends BaseClass {
  /**
   * Create a new Document category instance.
   * @param {string} id - UUID of the document
   * @param {string} name - Name of the document
   * @param {Date|null} createdAt - creation date - set in MSQL code
   * @param {Date|null} updatedAt - last update - set in MSQ code
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
    if (typeof value !== 'string') {
      const error = new Error('Name must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMin2Max50(trimmedValue)) {
      const error = new Error('Invalid name: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._name = value;
  }


  /**********************************CRUD operations************************************/

  /**
   * Fetch all document categories from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allDocumentCategories] = await db.execute('SELECT * FROM document_category');
    return allDocumentCategories;
  }

  /**
   * Fetch a document category by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute('SELECT * FROM document_category WHERE id = ?', [id]);
    if (rows.length === 0) {
      const error = new Error('Document category not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current document category into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO document_category 
        (id, name) 
        VALUES (?, ?)`, 
        [this.id, this.name]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Document category created successfully' };
  }
  
  /**
   * Update the current document category in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE document_category
        SET name = ?
        WHERE id = ?`,
        [this.name, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Document category not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document category updated successfully' };
  }

  /**
   * Delete a document category by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM document_category WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Document category not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document category deleted successfully' };
  }
}
