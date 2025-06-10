/**
 * Person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidEmail, isValidPassword, isNullOrStringMin2Max100, isNullOrStringMin2Max255, isNullOrStringMin2Max20, isNullOrStringMin2Max50, isValidTelephone } = require('../util/validation');
const BaseClass = require('./baseclass');
const bcrypt = require('bcrypt');

module.exports = class Person extends BaseClass {
  /**
   * Create a new Person instance.
   * @param {string} id - UUID of the person
   * @param {string} email - email of the person
   * @param {string|null} password - password - null at creation - needs to be set by person
   * @param {string|null} firstName - first name - null at creation - needs to be set by person
   * @param {string|null} lastName - last name - null at creation - needs to be set by person
   * @param {string|null} street - address - null at creation - needs to be set by person
   * @param {string|null} postalCode - address - null at creation - needs to be set by person
   * @param {string|null} city - address - null at creation - needs to be set by person
     * @param {string|null} telephone - optional telephone 
  * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
   * @param {string} idRole - UUID of the role
   * @param {string|null} roleName - Optional, loaded via JOIN
   */
  constructor({id, email, idRole = null, password = null, firstName = null, lastName = null, street = null, postalCode = null, city = null, telephone = null, createdAt = null, updatedAt = null, roleName = null}) {
    super({ id, createdAt, updatedAt });
    this.email = email;
    this.idRole = idRole;
    this._password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.postalCode = postalCode;
    this.city = city;
    this.telephone = telephone;
    this.roleName = roleName;
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

  get idRole() {
    return this._idRole;
  }

    /**TO DO VALIDATION OF CROSS REF  */

  set idRole(value) {
    const trimmedValue = value.trim();
    if (!isValidUUIDv4(trimmedValue)) {
      const error = new Error('Invalid UUID');
      error.statusCode = 400;
      throw error;
    }
    this._idRole = trimmedValue;
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

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    if (!isNullOrStringMin2Max100(value)) {
      const error = new Error('Invalid name: must be a string of minimum 2 characters and maximum 100.');
      error.statusCode = 400;
      throw error;
    }
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    if (!isNullOrStringMin2Max100(value)) {
      const error = new Error('Invalid name: must be a string of minimum 2 characters and maximum 100.');
      error.statusCode = 400;
      throw error;
    }
    this._lastName = value;
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

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(value) {
     if (!isNullOrStringMin2Max20(value)) {
      const error = new Error('Invalid postal code: must be a string of minimum 2 characters and maximum 20.');
      error.statusCode = 400;
      throw error;
    }
    this._postalCode = value;
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

  get roleName() {
    return this._roleName;
  }

  set roleName(value) {
     if (!isNullOrStringMin2Max50(value)) {
      const error = new Error('Invalid role name: must be a string of minimum 2 characters and maximum 50.');
      error.statusCode = 400;
      throw error;
    }
    this._roleName = value;
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
      person.id_role,
      role.name as role_name
      FROM person
      LEFT JOIN role ON person.id_role = role.id;`
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
      person.id_role,
      role.name as role_name
      FROM person
      LEFT JOIN role ON person.id_role = role.id
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
        (id, email, id_role) 
        VALUES (?, ?, ?)`, 
        [this.id, this.email, this.idRole]
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
        SET email = ?, password = ?, first_name = ?, last_name = ?, street = ?, postal_code = ?, city = ?, telephone = ?, id_role = ?
        WHERE id = ?`,
        [this.email, this.password, this.firstName, this.lastName, this.street, this.postalCode, this.city, this.telephone, this.idRole, this.id]
      );

    if (result.affectedRows === 0) {
      const error = new Error('Person not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Person updated successfully' };
  }
}
