/**
 * Charge call model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isValidUUIDv4 } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class ChargeCall extends BaseClass {
  /**
   * Create a new charge call instance.
   * @param {string} id - UUID of the unit
   * @param {Date} charge_call_date - date of charge call
   * @param {string} id_person - UUID of the person - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code
  */
  constructor({id, charge_call_date, id_person, createdAt = null, updatedAt = null }) {
    super({ id, createdAt, updatedAt });
    this.charge_call_date = charge_call_date;
    this.id_person = id_person;    
  }
  
  /****************************getters and setters for data validation***********************************/

  get charge_call_date() {
    return this._charge_call_date;
  }

  set charge_call_date(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid charge_call_date: must be a valid date.');
      error.statusCode = 400;
      throw error;
    }
    this._charge_call_date = value;
  }
  

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

  
  /**********************************CRUD operations************************************/

  /**
   * Fetch all charge calls from the database.
   * @returns {Promise<Object[]>}
   */


  static async fetchAll() {
    const [allChargeCalls] = await db.execute(`
    SELECT
      cc.id AS id,
      cc.charge_call_date,
      COALESCE(cl.total_charged, 0) AS total_charged,
      
      -- Person info
      p.id AS id_person,
      p.email AS person_email,
      p.first_name AS person_first_name,
      p.last_name AS person_last_name,

      -- First charge line state
      (
        SELECT cl2.state
        FROM charge_line cl2
        WHERE cl2.id_charge_call = cc.id
        ORDER BY cl2.id ASC
        LIMIT 1
      ) AS first_charge_line_state,

      -- All charge line states in a table
      (
        SELECT JSON_ARRAYAGG(cl3.state)
        FROM charge_line cl3
        WHERE cl3.id_charge_call = cc.id
      ) AS all_charge_line_states


    FROM charge_call cc

    -- Join total charged
    LEFT JOIN (
      SELECT id_charge_call, SUM(amount) AS total_charged
      FROM charge_line
      GROUP BY id_charge_call
    ) cl ON cl.id_charge_call = cc.id

    -- Join person
    LEFT JOIN person p ON p.id = cc.id_person

    ORDER BY cc.charge_call_date DESC;
    `);
    return allChargeCalls;
  }


  /**
     * Fetch all charge calls from the database for one person.
     * @returns {Promise<Object[]>}
     */
  static async getAllByPerson(personId) {
   const [allChargeCalls] = await db.execute(`
    SELECT 
      charge_call.charge_call_date,
      SUM(charge_line.amount) AS total_amount
    FROM charge_call
    JOIN charge_line ON charge_line.id_charge_call = charge_call.id
    WHERE charge_call.id_person = ?
    GROUP BY charge_call.charge_call_date
    ORDER BY charge_call.charge_call_date DESC;`

     , [personId]);
     return allChargeCalls;
   }
  
    /** 
    const [allChargeCalls] = await db.execute(`
     SELECT
        charge_call.id,
        charge_call.charge_call_date,
  
      -- Total charged per charge_call
      COALESCE(cl.total_charged, 0) AS total_charged,

      -- Total paid via associated charge lines
      COALESCE(cp.total_paid, 0) AS total_paid,

      -- Difference
      COALESCE(cl.total_charged, 0) - COALESCE(cp.total_paid, 0) AS amount_due,

      -- Person info
      p.id AS id_person,
      p.email AS person_email,
      p.first_name AS person_first_name,
      p.last_name AS person_last_name,

      -- First charge line state
      (
        SELECT cl2.state
        FROM charge_line cl2
        WHERE cl2.id_charge_call = charge_call.id
        ORDER BY cl2.id ASC
        LIMIT 1
      ) AS first_charge_line_state,

      -- All unique charge line states in a JSON array
      (
        SELECT JSON_ARRAYAGG(state)
        FROM (
          SELECT DISTINCT cl3.state
          FROM charge_line cl3
          WHERE cl3.id_charge_call = charge_call.id
        ) AS distinct_states
      ) AS all_charge_line_states

      FROM charge_call

      -- Total charged: sum of charge_lines belonging to this charge_call
      LEFT JOIN (
        SELECT id_charge_call, SUM(amount) AS total_charged
        FROM charge_line
        GROUP BY id_charge_call
      ) cl ON cl.id_charge_call = charge_call.id

      -- Total paid: sum of payments related to all lines in this charge_call
      LEFT JOIN (
        SELECT cl.id_charge_call, SUM(
          CASE
            WHEN cp.partial_payment IS NULL THEN chp.amount
            ELSE cp.partial_payment
          END
        ) AS total_paid
        FROM charge_line cl
        JOIN charge_line_charge_payment cp ON cp.id_charge_line = cl.id
        JOIN charge_payment chp ON chp.id = cp.id_charge_payment
        WHERE cl.id_charge_call IS NOT NULL
        GROUP BY cl.id_charge_call
      ) cp ON cp.id_charge_call = charge_call.id

      -- Person
      LEFT JOIN person p ON p.id = charge_call.id_person

      
    WHERE id_person = ?
    ORDER BY charge_call.charge_call_date DESC
      
      `
      , [personId]);
    return allChargeCalls;
  }
*/
  

  /**
   * Fetch a charge call by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(`
      SELECT
        cc.id AS id,
        cc.charge_call_date,
  
      -- Total charged per charge_call
      COALESCE(cl.total_charged, 0) AS total_charged,

      -- Total paid via associated charge lines
      COALESCE(cp.total_paid, 0) AS total_paid,

      -- Difference
      COALESCE(cl.total_charged, 0) - COALESCE(cp.total_paid, 0) AS amount_due,

      -- Person info
      p.id AS id_person,
      p.email AS person_email,
      p.first_name AS person_first_name,
      p.last_name AS person_last_name,

      -- First charge line state
      (
        SELECT cl2.state
        FROM charge_line cl2
        WHERE cl2.id_charge_call = cc.id
        ORDER BY cl2.id ASC
        LIMIT 1
      ) AS first_charge_line_state,

      -- All unique charge line states in a JSON array
      (
        SELECT JSON_ARRAYAGG(state)
        FROM (
          SELECT DISTINCT cl3.state
          FROM charge_line cl3
          WHERE cl3.id_charge_call = cc.id
        ) AS distinct_states
      ) AS all_charge_line_states

      FROM charge_call cc

      -- Total charged: sum of charge_lines belonging to this charge_call
      LEFT JOIN (
        SELECT id_charge_call, SUM(amount) AS total_charged
        FROM charge_line
        GROUP BY id_charge_call
      ) cl ON cl.id_charge_call = cc.id

      -- Total paid: sum of payments related to all lines in this charge_call
      LEFT JOIN (
        SELECT cl.id_charge_call, SUM(
          CASE
            WHEN cp.partial_payment IS NULL THEN chp.amount
            ELSE cp.partial_payment
          END
        ) AS total_paid
        FROM charge_line cl
        JOIN charge_line_charge_payment cp ON cp.id_charge_line = cl.id
        JOIN charge_payment chp ON chp.id = cp.id_charge_payment
        WHERE cl.id_charge_call IS NOT NULL
        GROUP BY cl.id_charge_call
      ) cp ON cp.id_charge_call = cc.id

      -- Person
      LEFT JOIN person p ON p.id = cc.id_person

      WHERE cc.id = ?
      ORDER BY cc.charge_call_date DESC;
     `, [id]);

    if (rows.length === 0) {
      const error = new Error('Charge call not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current charge call into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO charge_call 
          (id, charge_call_date, id_person) 
          VALUES (?, ?, ?)`, 
          [this.id, this.charge_call_date, this.id_person]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'Charge call created successfully',
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
   * Update the current charge call in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE charge_call
          SET charge_call_date = ?, id_person = ?
          WHERE charge_call.id = ?`,
          [this.charge_call_date, this.id_person, this.id]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Charge call not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge call updated successfully' };
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
     * Delete a charge call by ID.
     * @param {string} id
     * @returns {Promise<Object>}
     */
    static async delete(id) {
      const [result] = await db.execute('DELETE FROM charge_call WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        const error = new Error('Charge_call not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Charge_call deleted successfully' };
    }
}
