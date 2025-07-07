/**
 * Agresolution model class.
 * Provides data validation and database operations.
 */

const db = require('../util/database');
const { isStringMax50, isStringMax20, isValidUUIDv4, isValidAmount } = require('../util/validation');
const BaseClass = require('./baseclass');


module.exports = class AgResolution extends BaseClass {
  /**
   * Create a new AgResolution instance.
   * @param {string} id - UUID of the ag resolution
   * @param {string} title - Title of the ag resolution - not null
   * @param {string} resolution_text - resolution_text - not null
   * @param {string} required_majority - majority needed to vote - not null - enum {24, 25, 25-1, 26, unanimity, no_vote}
   * @param {boolean} budget - budget related to this vote? - not null
   * @param {string|null} status - enum {accepted or rejected} - nullable (null at creation)

   * @param {Date|null} createdAt - creation date - set in SQL code
   * @param {Date|null} updatedAt - last update - set in SQL code

   * @param {string} id_ag_minutes - Link to ag minutes - nullable - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string} id_unit_group - Link to ag unit group - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   * @param {string} id_ag_notice - Link to ag notice - not null - Foreign key - verification foreign key constraint handled in the CRUD operations
   
   * @param {Number|null} budget_amount - Amount - can be null (if related to ag-resolution with budget=false)
   * @param {string|null} budget_type - enum {operating or exceptional} - nullable
   * @param {Date|null} operating_budget_start - start date of operating budget - null if budget-type = exceptional
   * @param {Date|null} operating_budget_end - end date of operating budget - null if budget-type = exceptional
   * @param {Number|null} nb_of_instalments - in how many times the budget will be called?: 0 if we wait for the invoice / 1 : in one time: 2 in two times etc
   * @param {boolean|null} budget_recup_tenant - able to ask tenant to pay back? nullable
   * @param {boolean|null} budget_actif - actif or closed / closed by default 
   * @param {string|null} id_budget_category - Link to budget category - Foreign key - verification foreign key constraint handled in the CRUD operations nullable

   * @param {string|null} budget_category_name - Optional, loaded via JOIN
   * @param {Date|null} call_date_date - Optional, loaded via JOIN
   * @param {string|null} call_date_id - Optional, loaded via JOIN
  
   */
  constructor({
    id, title, resolution_text, required_majority, budget, 
    id_unit_group, id_ag_notice, id_ag_minutes=null, status=null,
    createdAt = null, updatedAt = null,
    budget_amount = null, budget_type = null, operating_budget_start = null, operating_budget_end = null,
    nb_of_instalments = null, budget_recup_tenant = null, budget_actif = null, id_budget_category = null,
    budget_category_name = null, call_date_date = null, call_date_id = null
  }) {
    super({ id, createdAt, updatedAt });
    this.title = title;
    this.resolution_text = resolution_text;
    this.required_majority = required_majority;
    this.budget = budget;
    this.status = status;
    this.id_ag_minutes = id_ag_minutes;
    this.id_unit_group = id_unit_group;
    this.id_ag_notice = id_ag_notice;
    this.budget_amount = budget_amount;
    this.budget_type = budget_type;
    this.operating_budget_start = operating_budget_start;
    this.operating_budget_end = operating_budget_end;
    this.nb_of_instalments = nb_of_instalments;
    this.budget_recup_tenant = budget_recup_tenant;
    this.budget_actif = budget_actif;
    this.id_budget_category = id_budget_category;
    this.budget_category_name = budget_category_name;
    this.call_date_date = call_date_date;
    this.call_date_id = call_date_id;
  }
  
  /****************************getters and setters for data validation***********************************/

  get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value !== 'string') {
      const error = new Error('Title must be a string.');
      error.statusCode = 400;
      throw error;
    }
    const trimmedValue = value.trim();

    if (!isStringMax50(trimmedValue)) {
      const error = new Error('Invalid title: must be a string of minimum length 2 and maximum of 50.');
      error.statusCode = 400;
      throw error;
    }
    this._title = trimmedValue;
  }

  get resolution_text() {
    return this._resolution_text;
  }

  set resolution_text(value) {
    if (typeof value !== 'string') {
      const error = new Error('Invalid resolution_text: must be a string.');
      error.statusCode = 400;
      throw error;
    }
    this._resolution_text = value;
  }

  get required_majority() {
    return this._required_majority;
  }

  set required_majority(value) {
    if (!isStringMax20(value) || !["24", "25", "25-1", "26", "unanimity", "no_vote"].includes(value)) {
      const error = new Error('Invalid majority');
      error.statusCode = 400;
      throw error;
    }
    this._required_majority = value;
  }
    
  get budget() {
    return this._budget;
  }
  
  set budget(value) {
    if (value !== 0 && value !== 1) {
      const error = new Error('Invalid budget');
      error.statusCode = 400;
      throw error;
    }
    this._budget = value;
  }

  get id_ag_minutes() {
    return this._id_ag_minutes;
  }
  
  set id_ag_minutes(value) {
    if (value !== null && !isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag minutes');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_minutes = value;
  }


  get id_unit_group() {
    return this._id_unit_group;
  }
  
  set id_unit_group(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id unit group');
      error.statusCode = 400;
      throw error;
    }
    this._id_unit_group = value;
  }

  get id_ag_notice() {
    return this._id_ag_notice;
  }
  
  set id_ag_notice(value) {
    if (!isValidUUIDv4(value)) {
      const error = new Error('Invalid id ag notice');
      error.statusCode = 400;
      throw error;
    }
    this._id_ag_notice = value;
  }

get budget_amount() {
  return this._budget_amount;
}

set budget_amount(value) {
  if (value !== null && value !== '' && !isValidAmount(value)) {
    const error = new Error('Invalid value');
    error.statusCode = 400;
    throw error;
  }
  this._budget_amount = value;
}

get status() {
  return this._status;
}

set status(value) {
  if (value === null) {
    this._status = null;
    return;
  }
  if (typeof value !== 'string') {
    const error = new Error('Status must be a string.');
    error.statusCode = 400;
    throw error;
  }

  if (value !== 'accepted' && value !== 'rejected') {
    const error = new Error('Invalid status : must be accepted or rejected.');
    error.statusCode = 400;
    throw error;
  }
  this._status = value;
}

get budget_type() {
  return this._budget_type;
}

set budget_type(value) {
  if (value === null) {
    this._budget_type = null;
    return;
  }
  if (typeof value !== 'string') {
    const error = new Error('Budget type must be a string.');
    error.statusCode = 400;
    throw error;
  }

  if (value !== 'operating' && value !== 'exceptional') {
    const error = new Error('Invalid budget type: must be operating or exceptional.');
    error.statusCode = 400;
    throw error;
  }
  this._budget_type = value;
}

get operating_budget_start() {
  return this._operating_budget_start;
}

set operating_budget_start(value) {
  if (value !== null) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid operating_budget_start: must be a valid Date or null.');
      error.statusCode = 400;
      throw error;
    }
    this._operating_budget_start = date;
  } else {
    this._operating_budget_start = null;
  }
}



get operating_budget_end() {
  return this._operating_budget_end;
}

set operating_budget_end(value) {
  if (value !== null) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid operating_budget_end: must be a valid Date or null.');
      error.statusCode = 400;
      throw error;
    }
    this._operating_budget_end = date;
  } else {
    this._operating_budget_end = null;
  }
}


get nb_of_instalments() {
  return this._nb_of_instalments;
}


set nb_of_instalments(value) {
  if (value === null) {
    this._nb_of_instalments = null;
    return;
  }
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('Nb_of_instalments amount must be a valid number');
  }

  if (value < 0 || value > 999) {
    throw new RangeError('Nb_of_instalments amount must be between 0 and 999');
  }

  if (!Number.isInteger(value)) {
    throw new RangeError('Nb_of_instalments must be an integer');
  }
  this._nb_of_instalments = value;
}
  
get budget_recup_tenant() {
  return this._budget_recup_tenant;
}

set budget_recup_tenant(value) {
  if (value === null) {
    this._budget_recup_tenant = null;
    return;
  }
  if (value !== 0 && value !== 1) {
    const error = new Error('Invalid budget_recup_tenant');
    error.statusCode = 400;
    throw error;
  }
  this._budget_recup_tenant = value;
}

get budget_actif() {
  return this._budget_actif;
}

set budget_actif(value) {
  if (value === null) {
    this._budget_actif = null;
    return;
  }
  if (value !== 0 && value !== 1) {
    const error = new Error('Invalid ag resolution budget actif status');
    error.statusCode = 400;
    throw error;
  }
  this._budget_actif = value;
}


get id_budget_category() {
  return this._id_budget_category;
}

set id_budget_category(value) {
  if (value === null) {
    this._id_budget_category = null;
    return;
  }
  if (!isValidUUIDv4(value)) {
    const error = new Error('Invalid id budget category');
    error.statusCode = 400;
    throw error;
  }
  this._id_budget_category = value;
}

  /**********************************CRUD operations************************************/

  /**
   * Fetch all ag resolutions from the database.
   * @returns {Promise<Object[]>}
   */
  static async fetchAll() {
    const [agResolutions] = await db.execute(`SELECT * FROM ag_resolution;`);
    return agResolutions;
  }

  /**
     * Fetch ag notices (via ag resolution) without id_ag_minute
     * @returns {Promise<Object[]>}
     */
  static async getAllNoticesWithoutMinutes() {
    const [agResolutions] = await db.execute(`
      SELECT DISTINCT 
        ag_notice.title as ag_notice_title,
        ag_notice.id as ag_notice_id
      FROM ag_resolution
      JOIN ag_notice 
        ON ag_resolution.id_ag_notice = ag_notice.id
      WHERE id_ag_minutes IS NULL
      ;`);
    return agResolutions;
  }

  /**
     * Fetch all ag resolutions by ag notice ID.
     * @param {string} id_ag_notice
     * @returns {Promise<Object>}
     */
  static async getByAgNotice(id_ag_notice) {
    const [agResolutions] = await db.execute(`SELECT * FROM ag_resolution WHERE id_ag_notice = ?`, [id_ag_notice]);
    return agResolutions;
  }

   /**
       * Fetch all ag resolutions by ag minutes ID.
       * @param {string} id_ag_minutes
       * @returns {Promise<Object>}
       */
   static async getByAgMinutes(id_ag_minutes) {
    const [agResolutions] = await db.execute(`SELECT * FROM ag_resolution WHERE id_ag_minutes = ?`, [id_ag_minutes]);
    return agResolutions;
  }


  /**
   * Fetch a ag resolution by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async get(id) {
    const [rows] = await db.execute(
    `SELECT 
      ag_resolution.*, 
      budget_category.name as budget_category_name,
      call_date.id as call_date_id,
      call_date.date_call as call_date_date
    FROM ag_resolution 
    LEFT JOIN call_date 
      ON ag_resolution.id = call_date.id_ag_resolution
    LEFT JOIN budget_category 
      ON budget_category.id = ag_resolution.id_budget_category
    WHERE ag_resolution.id = ?
    `, [id]);

    if (rows.length === 0) {
      const error = new Error('Ag resolution not found');
      error.statusCode = 404;
      throw error;
    }
    return rows[0];
  }
  
  /**
   * Insert the current ag resolution into the database.
   * @returns {Promise<Object>}
   */
  async post() {
    try {
      const [result] = await db.execute(
        `INSERT INTO ag_resolution (
          id,
          title,
          resolution_text,
          required_majority,
          budget,

          id_ag_minutes,
          id_unit_group,
          id_ag_notice,

          budget_amount,
          budget_type,
          operating_budget_start,
          operating_budget_end,
          nb_of_instalments,
          budget_recup_tenant,
          budget_actif,

          id_budget_category
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            this.id,
            this.title,
            this.resolution_text,
            this.required_majority,
            this.budget,

            this.id_ag_minutes,
            this.id_unit_group,
            this.id_ag_notice,

            this.budget_amount,
            this.budget_type,
            this.operating_budget_start,
            this.operating_budget_end,
            this.nb_of_instalments,
            this.budget_recup_tenant,
            this.budget_actif,

            this.id_budget_category
          ]
        );
      
      if (result.affectedRows === 0) {
        const error = new Error('Insert failed: no rows affected.');
        error.statusCode = 500;
        throw error;
      }
      return { 
        message: 'Ag resolution created successfully',
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
   * Update the ag resolution in the database.
   * @returns {Promise<Object>}
   */
  async update() {
    try {
      const [result] = await db.execute(
        `UPDATE ag_resolution
          SET 
          title = ?, 
          resolution_text = ?, 
          required_majority = ?, 
          budget = ?, 
          id_ag_minutes = ?, 
          id_unit_group = ?, 
          id_ag_notice = ?,
          budget_amount = ?,
          budget_type = ?,
          operating_budget_start = ?,
          operating_budget_end = ?,
          nb_of_instalments = ?,
          budget_recup_tenant = ?,
          budget_actif = ?,
          id_budget_category = ?
          WHERE id = ?`,
          [ this.title, 
            this.resolution_text,
            this.required_majority,
            this.budget,
            this.id_ag_minutes,
            this.id_unit_group,
            this.id_ag_notice,
            this.budget_amount,
            this.budget_type,
            this.operating_budget_start,
            this.operating_budget_end,
            this.nb_of_instalments,
            this.budget_recup_tenant,
            this.budget_actif,
            this.id_budget_category,
            this.id
          ]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Ag resolution not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag resolution updated successfully' };
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
   * Update the ag resolution in the database.
   * @returns {Promise<Object>}
   */

  static async patchAgMin(id, id_ag_minutes) {
    try {
      const [result] = await db.execute(
        `UPDATE ag_resolution
          SET id_ag_minutes = ? 
          WHERE id = ?`,
          [ id_ag_minutes,
            id
          ]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Ag resolution not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag resolution updated successfully' };
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
   * Update the status of the ag resolution in the database.
   * @returns {Promise<Object>}
   */

   static async patchStatus(id, status) {
    try {
      const [result] = await db.execute(
        `UPDATE ag_resolution
          SET status = ? 
          WHERE id = ?`,
          [ status,
            id
          ]
        );

      if (result.affectedRows === 0) {
        const error = new Error('Ag resolution not found');
        error.statusCode = 404;
        throw error;
      }
      return { message: 'Ag resolution updated successfully' };
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
   * Delete a ag resolution by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM ag_resolution WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      const error = new Error('Ag resolution not found');
      error.statusCode = 404;
      throw error;
    }
    return { message: 'Ag resolution deleted successfully' };
  }
}
