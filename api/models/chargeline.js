/**
 * Charge line model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4, isValidAmount } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class ChargeLine extends BaseClass {
  /**
   * Create a new charge call instance.
   * @param {string} id - UUID of the charge line
   * @param {Number} amount - the amount of the line 
   * @param {Date} call_date - date of charge line
   * @param {Date} state -  enum {to_be_sent, send, remainder, paid} - not null - DEFAULT 'to_be_sent'
   * @param {string} id_unit - UUID of the unit - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string} id_charge_call - UUID of the charge calll - can be null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string} id_ag_resolution - UUID of the id ag resolution budget - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
  */

  constructor({id, amount, call_date,id_unit, id_ag_resolution, state = "to_be_sent", id_charge_call = null, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.amount = amount;
    this.call_date = call_date;
    this.id_unit = id_unit;
    this.id_ag_resolution = id_ag_resolution;
    this.state = state;
    this.id_charge_call = id_charge_call;
  }
  
  /****************************getters and setters for data validation***********************************/


  get amount() {
    return this._amount;
  }

  set amount(value) {
    if (!isValidAmount(value)) {
      const error = new Error('Invalid value');
      error.statusCode = 400;
      throw error;
    }
    this._amount = value;
  }
  get call_date() {
    return this._call_date;
  }

  set call_date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid call_date: must be a valid date.');
      error.statusCode = 400;
      throw error;
    }
    this._call_date = date;
  }
  

  get id_unit() {
    return this._id_unit;
  }
  
  set id_unit(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_person');
      error.statusCode = 400;
      throw error;
    }
    this._id_unit = value;
  }


  get id_ag_resolution() {
    return this._id_ag_resolution;
  }
  
  set id_ag_resolution(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id_person');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_resolution = value;
  }
  
  get id_charge_call() {
    return this._id_charge_call;
  }
  
  set id_charge_call(value) {
    if (!isValidUUIDv4(value) && value !== null) {
      const error = new Error('Invalid id_person');
      error.statusCode = 400;
      throw error;
    }
    this._id_charge_call = value;
  }
  
  get state() {
    return this._state;
  }

  set state(value) {
    if (typeof value !== 'string') {
      const error = new Error('State must be a string.');
      error.statusCode = 400;
      throw error;
    }

    if (value !== 'to_be_sent' && value !== 'send' && value !== 'remainder' && value !== 'paid') {
      const error = new Error('State must be "to_be_sent", "send", "remainder" or "paid".');
      error.statusCode = 400;
      throw error;
    }
    this._state = value;
  }


  /**********************************CRUD operations************************************/

  /**
   * Fetch all charge lines from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [allChargeLines] = await db.execute(`SELECT 
      charge_line.*,
      person.id as person_id,
      ag_resolution.title as ag_resolution_title,
      ag_minutes.minutes_date as ag_minutes_date,
      unit.name as unit_name,

      COALESCE(total_partial_payments.total_partial_paid, 0) AS total_partial_paid,
      charge_line.amount - COALESCE(total_partial_payments.total_partial_paid, 0) AS open_amount

      FROM charge_line

      LEFT JOIN unit
        ON unit.id = charge_line.id_unit
      
      LEFT JOIN person
        ON person.id = unit.id_person 

      LEFT JOIN ag_resolution
        ON ag_resolution.id = charge_line.id_ag_resolution

      LEFT JOIN ag_minutes
        ON ag_minutes.id = ag_resolution.id_ag_minutes

      LEFT JOIN (
        SELECT 
          charge_line_charge_payment.id_charge_line,
          SUM(charge_line_charge_payment.partial_payment) AS total_partial_paid
        FROM charge_line_charge_payment
        GROUP BY charge_line_charge_payment.id_charge_line
      ) AS total_partial_payments
        ON total_partial_payments.id_charge_line = charge_line.id
      ;
      `);
    return allChargeLines;
  }

  /**
   * Fetch all charge lines from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAllWithOpenAmounts() {
    const [allChargeLinesWithOpenAmounts] = await db.execute(`
      SELECT 
        charge_line.*,
        person.id AS person_id,
        ag_resolution.title AS ag_resolution_title,
        ag_minutes.minutes_date AS ag_minutes_date,
        unit.name AS unit_name,
        charge_call.charge_call_date AS charge_call_date,
  
        COALESCE(total_partial_payments.total_partial_paid, 0) AS total_partial_paid,
        charge_line.amount - COALESCE(total_partial_payments.total_partial_paid, 0) AS open_amount
  
      FROM charge_line
  
      LEFT JOIN unit ON unit.id = charge_line.id_unit
      LEFT JOIN person ON person.id = unit.id_person 
      LEFT JOIN ag_resolution ON ag_resolution.id = charge_line.id_ag_resolution
      LEFT JOIN ag_minutes ON ag_minutes.id = ag_resolution.id_ag_minutes
      LEFT JOIN charge_call ON charge_call.id = charge_line.id_charge_call
  
      LEFT JOIN (
        SELECT 
          id_charge_line,
          SUM(partial_payment) AS total_partial_paid
        FROM charge_line_charge_payment
        WHERE partial_payment IS NOT NULL
        GROUP BY id_charge_line
      ) AS total_partial_payments
        ON total_partial_payments.id_charge_line = charge_line.id
  
      WHERE NOT EXISTS (
        SELECT 1
        FROM charge_line_charge_payment clcp
        WHERE clcp.id_charge_line = charge_line.id
        AND clcp.partial_payment IS NULL
      )
      ORDER BY 
        charge_call_date IS NULL,  -- FALSE (0) for non-NULL, TRUE (1) for NULL
        charge_call_date ASC;
    `);
  
    return allChargeLinesWithOpenAmounts;
  }
  


 /**
   * Fetch all charge lines from the database without charge call
   * @returns {Promise<Object[]>}
   */
  static async fetchAllNotCalled() {
    const [allChargeLinesWithoutChargeCall] = await db.execute(`
      SELECT 
        charge_line.*,
        unit.id_person as unit_id_person,
        person.id as person_id,
        person.email as person_email,
        person.first_name as person_first_name,
        person.last_name as person_last_name,
        ag_resolution.title as ag_resolution_title,
        ag_minutes.minutes_date as ag_minutes_date

      FROM charge_line 

      LEFT JOIN unit
        ON unit.id = charge_line.id_unit
      
      LEFT JOIN person
        ON person.id = unit.id_person

      LEFT JOIN ag_resolution
        ON ag_resolution.id = charge_line.id_ag_resolution
      
      LEFT JOIN ag_minutes
        ON ag_minutes.id = ag_resolution.id_ag_minutes

      WHERE charge_line.id_charge_call IS NULL
      
      ORDER BY charge_line.call_date
      ;`);
    return allChargeLinesWithoutChargeCall;
  }

 
  /**
   * Fetch all charge lines from the database with spoecific chargeCall id
   * @param {string} id
   * @returns {Promise<Object[]>}
   */
  static async fetchByChargeCallId(chargeCallId) {
    const [allChargeLinesWithChargeCallId] = await db.execute(`
      SELECT 
        charge_line.amount,
        charge_line.state,
        unit.name as unit_name,
        ag_resolution.title as ag_resolution_title,
        ag_minutes.minutes_date as ag_minutes_date

      FROM charge_line 

      LEFT JOIN unit
        ON unit.id = charge_line.id_unit
      
      LEFT JOIN person
        ON person.id = unit.id_person

      LEFT JOIN ag_resolution
        ON ag_resolution.id = charge_line.id_ag_resolution
      
      LEFT JOIN ag_minutes
        ON ag_minutes.id = ag_resolution.id_ag_minutes

      WHERE charge_line.id_charge_call = ?
      
      ORDER BY charge_line.call_date
      ;`, [chargeCallId]);
    return allChargeLinesWithChargeCallId;
  }



  /**
   * Fetch a charge line by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`SELECT * FROM charge_line WHERE charge_line.id = ?`, [id]);

    if (rows.length === 0) {
      const error = new Error('Charge line not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current charge line into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO charge_line 
          (id, amount, call_date, id_unit, id_ag_resolution, state, id_charge_call) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`, 
          [this.id, this.amount, this.call_date, this.id_unit, this.id_ag_resolution, this.state, this.id_charge_call]
    );

      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'Charge line created successfully' ,
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
   * Update the current charge line in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE charge_line
          SET amount = ?, call_date = ?, id_unit = ?, id_ag_resolution = ?, state = ?, id_charge_call = ? 
          WHERE charge_line.id = ?`,
          [this.amount, this.call_date, this.id_unit, this.id_ag_resolution, this.state, this.id_charge_call, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Charge line not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge line updated successfully' };
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
  * Update the id_charge_call of a charge line in the database by ID.
    * @param {string} id
    * @param {string} id_charge_call
    * @returns {Promise<Object>}
    */
    
  static async updateIdChargeCall(id, id_charge_call) {
    const [result] = await db.execute(
      `UPDATE charge_line
        SET id_charge_call = ? 
        WHERE charge_line.id = ?`,
        [id_charge_call, id]
      );
      if (result.affectedRows === 0) {
        const error = new Error('Charge_line not found');
        error.statusCode = 404;
        throw error;
      }
      return { 
        message: 'Charge_line updated successfully' 
      };
    }

   /**
     * Delete a charge line by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id) {
      const [result] = await db.execute('DELETE FROM charge_line WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        const error = new Error('Charge_line not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge_line deleted successfully' };
    }
}
