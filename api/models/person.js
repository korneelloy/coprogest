/**
 * Person model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidEmail, isValidPassword, isNullOrStringMax100, isNullOrStringMax255, isNullOrStringMax20, isNullOrStringMax50, isValidTelephone } = require('../util/validation');
const BaseClass = require('./baseclass');
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
   * @param {string} id_role - UUID of the role - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string|null} role_name - Optional, loaded via JOIN
   */
  constructor({id, email, id_role = null, password = null, first_name = null, last_name = null, street = null, postal_code = null, city = null, telephone = null, createdAt = null, updatedAt = null, role_name = null}) {
    super({ id, createdAt, updatedAt });
    this.email = email;
    this.id_role = id_role;
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
    this._email = trimmedValue;
  }

  get id_role() {
    return this._id_role;
  }

  set id_role(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid UUID');
      error.statusCode = 400;
      throw error;
    }
    this._id_role = value;
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
    if (!isNullOrStringMax100(value)) {
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
    if (!isNullOrStringMax100(value)) {
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
    if (!isNullOrStringMax255(value)) {
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
     if (!isNullOrStringMax20(value)) {
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
    if (!isNullOrStringMax50(value)) {
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
     if (!isNullOrStringMax50(value)) {
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
   * Fetch a person by email (be carefull password included!!!).
   * @param {string} email
   * @returns {Promise<Object>}
   */
  static async getUserByEmail(email) {
    const [rows] = await db.execute(`SELECT
      person.id,
      person.email,
      person.password,
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
      WHERE person.email = ?`, [email]
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
    try {
      const [result] = await db.execute(
        `INSERT INTO person 
          (id, email, id_role) 
          VALUES (?, ?, ?)`, 
          [this.id, this.email, this.id_role]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { message: 'Person created successfully' };
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
   * Update the current person in the database / password dealt with in updatePw method
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE person
          SET email = ?, first_name = ?, last_name = ?, street = ?, postal_code = ?, city = ?, telephone = ?, id_role = ?
          WHERE id = ?`,
          [this.email, this.first_name, this.last_name, this.street, this.postal_code, this.city, this.telephone, this.id_role, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Person updated successfully' };
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
   * Update a password
   * @returns {Promise<Object>}
   */
  static async updatePw(email, hashed_pw) {
    try {
      const [result] = await db.execute(
        `UPDATE person
          SET password = ?
          WHERE email = ?`,
          [hashed_pw, email]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Person not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Password updated successfully' };
    } catch (err) {
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        const error = new Error('Foreign key constraint violated');
        error.statusCode = 400;
        throw error;
      }
      throw err;
    }
  }
}
