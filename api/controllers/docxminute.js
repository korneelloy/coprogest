/**
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const pool = require('../util/database');

exports.generateMinute = async (req, res) => {
  const id = req.params.id;

  try {
    const templatePath = path.join(__dirname, '../documents/templates/ag-minute-template.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    console.log(content.slice(0, 100));
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    const [rows] = await pool.query('SELECT * FROM ag_minutes WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('AG minute introuvable.');
    }
    const minute = rows[0];

    const [resolutions] = await pool.query(
      `SELECT title, resolution_text FROM ag_resolution WHERE id_ag_minutes = ?`,
      [id]
    );

    doc.setData({
      minutes_date: minute.minutes_date.toISOString().slice(0, 10),
      place: minute.place,
      resolutions: resolutions.map(r => ({
        title: r.title,
        resolution_text: r.resolution_text
      }))
    });

    doc.render();
    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    const outputFilePath = path.join(__dirname, '../documents/generated/ag-minute-' + id + '.docx');
    fs.writeFileSync(outputFilePath, buf);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=compte-rendu-${id}.docx`);
    res.send(buf);
  } catch (err) {
    console.error('Erreur génération .docx :', err);
    res.status(500).send('Erreur lors de la génération du document.');
  }
};
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const db = require('../util/database');

exports.generateMinute = async (req, res) => {
  const minuteId = req.params.id;
  try {
    const [[agMinute]] = await db.execute(`
      SELECT *
      FROM ag_minutes
      WHERE id = ?
    `, [minuteId]);

    if (!agMinute) {
      return res.status(404).send("Compte rendu introuvable.");
    }

    const [resolutions] = await db.execute(`
      SELECT title, resolution_text, required_majority, budget
      FROM ag_resolution
      WHERE id_ag_minutes = ?
    `, [minuteId]);

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: "COMPTE RENDU DE L’ASSEMBLÉE GÉNÉRALE",
            heading: HeadingLevel.HEADING_1,
            alignment: "center"
          }),
          new Paragraph(""),
          new Paragraph(`Lieu : ${agMinute.place}`),
          new Paragraph(`Date : ${new Date(agMinute.ag_date).toLocaleDateString('fr-FR')} à ${new Date(agMinute.ag_date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`),
          new Paragraph(""),
          new Paragraph("Cher(e) copropriétaire,"),
          new Paragraph("Vous trouverez ci-dessous le compte rendu de l’Assemblée Générale Ordinaire de la copropriété."),
          new Paragraph(""),
          new Paragraph("ORDRE DU JOUR :"),
          new Paragraph("1. Ouverture de la séance"),
          new Paragraph("2. Désignation du président et du secrétaire de séance"),
          new Paragraph("3. Lecture et approbation du procès-verbal précédent"),
          ...resolutions.map((res, i) => new Paragraph({
            children: [
              new TextRun({ text: `${i + 4}. ${res.title}`, bold: true }),
              new TextRun({ text: `\n   - Majorité requise : ${res.required_majority}` }),
              new TextRun({ text: `\n   - Budget concerné : ${res.budget ? 'Oui' : 'Non'}` }),
              new TextRun({ text: `\n   - Texte : ${res.resolution_text}` }),
            ]
          })),
          new Paragraph(`${resolutions.length + 4}. Questions diverses`),
          new Paragraph(`${resolutions.length + 5}. Clôture de la séance`),
          new Paragraph(""),
          new Paragraph("Le syndic bénévole"),
        ]
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=convocation-${minuteId}.docx`
    });
    res.send(buffer);

  } catch (err) {
    console.error(">> Erreur lors de la génération :", err);
    res.status(500).send("Erreur lors de la génération.");
  }
};
