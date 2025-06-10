/**
 * Person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidEmail, isValidPassword, isNullOrStringMin2Max100, isNullOrStringMin2Max255, isNullOrStringMin2Max20, isNullOrStringMin2Max50, isValidTelephone } = require('../util/validation');
const BaseClass = require('./baseClass');
const bcrypt = require('bcrypt');

module.exports = class Person extends BaseClass {
  /**
   * Create a new Person instance.
   * @param {string} id - UUID of the person
   * @param {string} email - email of the person
   * @param {string|null} password - password - null at creation - needs to be set by person
   * @param {string|null} first_name - first name - null at creation - needs to be set by person
   * @param {string|null} last_name - last name - null at creation - needs to be set by person
   * @param {string|null} street - address - null at creation - needs to be set by person
   * @param {string|null} postal_code - address - null at creation - needs to be set by person
   * @param {string|null} city - address - null at creation - needs to be set by person
     * @param {string|null} telephone - optional telephone 
  * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {string} role_id - UUID of the role
   * @param {string|null} role_name - Optional, loaded via JOIN
   */
  constructor({id, email, role_id = null, password = null, first_name = null, last_name = null, street = null, postal_code = null, city = null, telephone = null, createdAt = null, updatedAt = null, role_name = null}) {
    super({ id, createdAt, updatedAt });
    this.email = email;
    this.role_id = role_id;
    this._password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.street = street;
    this.postal_code = postal_code;
    this.city = city;
    this.telephone = telephone;
    this.role_name = role_name;
  }
  
  /****************************getters and setters for data validation***********************************/

  get email() {
    return this._email;
  }

  set email(value) {
    if (typeof value !== 'string') {
      const error = new Error('Email must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isValidEmail(trimmedValue)) {
      const error = new Error('Invalid email.');
      error.statusCode = 400;
      throw error;
    }
    this._email = value;
  }

  get role_id() {
    return this._role_id;
  }

    /**TO DO VALIDATION OF CROSS REF  */

  set role_id(value) {
    const trimmedValue = value.trim();
    if (!isValidUUIDv4(trimmedValue)) {
      const error = new Error('Invalid UUID');
      error.statusCode = 400;
      throw error;
    }
    this._role_id = trimmedValue;
  }

  get password() {
    return this._password;
  }

  async setHashedPassword(rawPassword) {
    if (!isValidPassword(rawPassword)) {
      throw Object.assign(new Error('Invalid password'), { statusCode: 400 });
    }
    this._password = await bcrypt.hash(rawPassword, 10);
  }

  async verifyPassword(inputPassword) {
    return await bcrypt.compare(inputPassword, this._password);
  }

  get first_name() {
    return this._first_name;
  }

  set first_name(value) {
    if (!isNullOrStringMin2Max100(value)) {
      const error = new Error('Invalid name: must be a string of minimum 2 characters and maximum 100.');
      error.statusCode = 400;
      throw error;
    }
    this._first_name = value;
  }

  get last_name() {
    return this._last_name;
  }

  set last_name(value) {
    if (!isNullOrStringMin2Max100(value)) {
      const error = new Error('Invalid name: must be a string of minimum 2 characters and maximum 100.');
      error.statusCode = 400;
      throw error;
    }
    this._last_name = value;
  }

  get street() {
    return this._street;
  }

  set street(value) {
    if (!isNullOrStringMin2Max255(value)) {
      const error = new Error('Invalid street name: must be a string of minimum 2 characters and maximum 255.');
      error.statusCode = 400;
      throw error;
    }
    this._street = value;
  }

  get postal_code() {
    return this._postal_code;
  }

  set postal_code(value) {
     if (!isNullOrStringMin2Max20(value)) {
      const error = new Error('Invalid postal code: must be a string of minimum 2 characters and maximum 20.');
      error.statusCode = 400;
      throw error;
    }
    this._postal_code = value;
  }

  get city() {
    return this._city;
  }

  set city(value) {
    if (!isNullOrStringMin2Max50(value)) {
      const error = new Error('Invalid city name: must be a string of minimum 2 characters and maximum 50.');
      error.statusCode = 400;
      throw error;
    }
    this._city = value;
  }

  get telephone() {
    return this._telephone;
  }

  set telephone(value) {
    if (!isValidTelephone(value)) {
      const error = new Error('Invalid telephone number.');
      error.statusCode = 400;
      throw error;
    }
    this._telephone = value;
  }

  get role_name() {
    return this._role_name;
  }

  set role_name(value) {
     if (!isNullOrStringMin2Max50(value)) {
      const error = new Error('Invalid role name: must be a string of minimum 2 characters and maximum 50.');
      error.statusCode = 400;
      throw error;
    }
    this._role_name = value;
  }

  /**********************************CRUD operations************************************/

  /**
   * Fetch all persons from the database (password excluded).
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allPersons] = await db.execute(`SELECT 
      person.id,
      person.email,
      person.first_name,
      person.last_name,
      person.street,
      person.postal_code,
      person.city,
      person.telephone,
      person.created_at,
      person.updated_at,
      person.role_id,
      role.name as role_name
      FROM person
      LEFT JOIN role ON person.role_id = role.id;`
    );
    return allPersons;
  }

  /**
   * Fetch a person by ID (password excluded).
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT 
      person.id,
      person.email,
      person.first_name,
      person.last_name,
      person.street,
      person.postal_code,
      person.city,
      person.telephone,
      person.created_at,
      person.updated_at,
      person.role_id,
      role.name as role_name
      FROM person
      LEFT JOIN role ON person.role_id = role.id
      WHERE person.id = ?`, [id]
    );
   
    if (rows.length === 0) {
      const error = new Error('Person not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current person into the database (with only basic information)
   * @returns {Promise<Object>}
   */
  async post() {
    const [result] = await db.execute(
      `INSERT INTO person 
        (id, email, role_id) 
        VALUES (?, ?, ?)`, 
        [this.id, this.email, this.role_id]
      );
    
    if (result.affectedRows === 0) {
      const error = new Error('Insert failed: no rows affected.');
      error.statusCode = 500;
      throw error;
    }
    return { message: 'Person created successfully' };
  }
  
  /**
   * Update the current person in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    const [result] = await db.execute(
      `UPDATE person
        SET email = ?, password = ?, first_name = ?, last_name = ?, street = ?, postal_code = ?, city = ?, telephone = ?, role_id = ?
        WHERE id = ?`,
        [this.email, this.password, this.first_name, this.last_name, this.street, this.postal_code, this.city, this.telephone, this.role_id, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Person not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Person updated successfully' };
  }
}
