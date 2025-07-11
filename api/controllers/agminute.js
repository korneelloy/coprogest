const AgMinute = require('../models/agminute');
const { v4: uuidv4 } = require('uuid');

/**
 * Retrieve and return all ag minutes.
 */
exports.getAll = async (req, res, next) => {
  try {
    const allAgMinutes = await AgMinute.fetchAll();
    res.status(200).json(allAgMinutes);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Retrieve and return an ag minute by its ID.
 */
exports.getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const agMinute = await AgMinute.get(id);
    res.status(200).json(agMinute);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Create a new ag minute with the provided data.
 */
exports.postOne = async (req, res, next) => {
  try {
    const id = uuidv4();
    const minutes_date = req.body.minutes_date;
    const place = req.body.place;

    const agMinute = new AgMinute({
      id,
      minutes_date,
      place
    });
    
    const postResponse = await agMinute.post();

    res.status(201).json(postResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};


/**
 * Update an existing ag minute identified by its ID.
 */
exports.updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const minutes_date = req.body.minutes_date;
    const place = req.body.place;

    const agMinute = new AgMinute({
      id,
      minutes_date,
      place
    });
    
    const updateResponse = await agMinute.update();

    res.status(200).json(updateResponse);

  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

/**
 * Delete a ag minute by its ID.
 */
exports.deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteResponse = await AgMinute.delete(id);
    res.status(200).json(deleteResponse);
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
};

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const db = require('../util/database'); // Adjust based on your project’s structure

/**
 * Generate a Word (.docx) meeting report for a specific AG Minute
 */
exports.downloadOne = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Fetch AG minute details and its related notice
    const [[minute]] = await db.execute(`
      SELECT ag_minute.*, ag_notice.place, ag_notice.ag_date, ag_notice.chairperson, ag_notice.secretary, ag_notice.closing_time
      FROM ag_minute
      JOIN ag_notice ON ag_notice.id = ag_minute.id_ag_notice
      WHERE ag_minute.id = ?`, [id]);

    if (!minute) {
      return res.status(404).send("Minute not found.");
    }

    // Fetch related resolutions
    const [resolutions] = await db.execute(`
      SELECT title, text, vote_result
      FROM ag_resolution
      WHERE id_ag_notice = ?`, [minute.id_ag_notice]);

    // Load the Word template file
    const templatePath = path.join(__dirname, '../templates/ag-minute-template.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    // Format meeting date in French style
    const formattedDate = new Date(minute.ag_date).toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Inject data into the template
    doc.setData({
      date: formattedDate,
      place: minute.place,
      chairperson: minute.chairperson,
      secretary: minute.secretary,
      closing_time: minute.closing_time,
      resolutions
    });

    // Render the final document
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Send the file as a downloadable attachment
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=compte-rendu-${id}.docx`
    });

    res.send(buffer);
  } catch (err) {
    console.error("Error while generating .docx:", err);
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
