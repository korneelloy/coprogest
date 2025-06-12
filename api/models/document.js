/**
 * Document model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidURL, isStringMax50, isNullOrStringMax255 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class Document extends BaseClass {
  /**
   * Create a new Document instance.
   * @param {string} id - UUID of the document
   * @param {string} name - Name of the document - not null
   * @param {string} url - URL of the document - not null
   * @param {string} id_document_category - UUID of the category - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string|null} description - Optional description
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {string|null} category_name - Optional, loaded via JOIN
   */
  constructor({id, name, url, id_document_category, description = null, createdAt = null, updatedAt = null, category_name = null }) {
    super({ id, createdAt, updatedAt });
    this.name = name;
    this.url = url;
    this.id_document_category = id_document_category;
    this.description = description;
    this.category_name = category_name;
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

  get url() {
    return this._url;
  }

  set url(value) {
    if (typeof value !== 'string') {
      const error = new Error('Url must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();
    if (!isValidURL(trimmedValue)) {
      const error = new Error('Invalid url');
      error.statusCode = 400;
      throw error;
    }
    this._url = trimmedValue;
  }
    
  get id_document_category() {
    return this._id_document_category;
  }
  
  set id_document_category(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_document_category');
      error.statusCode = 400;
      throw error;
    }
    this._id_document_category = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    if (!isNullOrStringMax255(value)) {
      const error = new Error('Invalid description: must be null or a string between 2 and 255 characters.');
      error.statusCode = 400;
      throw error;
    }
    this._description = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all documents from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allDocuments] = await db.execute(`SELECT 
      document.id,
      document.name,
      document.description,
      document.url,
      document.created_at,
      document.updated_at,
      document.id_document_category,
      document_category.name as category_name
      FROM document 
      LEFT JOIN document_category ON document.id_document_category = document_category.id
      ORDER BY GREATEST(
        IFNULL(document.updated_at, '1970-01-01 00:00:00'),
        document.created_at
      ) DESC;`
    );
    return allDocuments;
  }

  /**
   * Fetch a document by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT 
      document.id,
      document.name,
      document.description,
      document.url,
      document.created_at,
      document.updated_at,
      document.id_document_category,
      document_category.name as category_name
      FROM document
      LEFT JOIN document_category ON document.id_document_category = document_category.id
      WHERE document.id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current document into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO document 
          (id, name, description, url, id_document_category) 
          VALUES (?, ?, ?, ?, ?)`, 
          [this.id, this.name, this.description, this.url, this.id_document_category]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Document created successfully' };
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
   * Update the current document in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE document
          SET name = ?, description = ?, url = ?, id_document_category = ?
          WHERE id = ?`,
          [this.name, this.description, this.url, this.id_document_category, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Document not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Document updated successfully' };
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
   * Delete a document by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM document WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Document not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Document deleted successfully' };
  }
}
