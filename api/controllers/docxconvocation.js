const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
const db = require('../util/database');

exports.generateConvocation = async (req, res) => {
  const agId = req.params.id;
  try {
    const [[agNotice]] = await db.execute(`
      SELECT title, place, ag_date
      FROM ag_notice
      WHERE id = ?
    `, [agId]);

    if (!agNotice) {
      return res.status(404).send("Convocation introuvable.");
    }

    const [resolutions] = await db.execute(`
      SELECT title, resolution_text, required_majority, budget
      FROM ag_resolution
      WHERE id_ag_notice = ?
    `, [agId]);

    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: "CONVOCATION À L’ASSEMBLÉE GÉNÉRALE",
            heading: HeadingLevel.HEADING_1,
            alignment: "center"
          }),
          new Paragraph(""),
          new Paragraph(`Lieu : ${agNotice.place}`),
          new Paragraph(`Date : ${new Date(agNotice.ag_date).toLocaleDateString('fr-FR')} à ${new Date(agNotice.ag_date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`),
          new Paragraph(""),
          new Paragraph("Cher(e) copropriétaire,"),
          new Paragraph("Vous êtes convié(e) à l’Assemblée Générale Ordinaire de la copropriété."),
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
          new Paragraph("Merci de confirmer votre présence ou de transmettre un pouvoir en cas d’absence."),
          new Paragraph(""),
          new Paragraph("Le syndic bénévole"),
        ]
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=convocation-${agId}.docx`
    });
    res.send(buffer);

  } catch (err) {
    console.error(">> Erreur lors de la génération :", err);
    res.status(500).send("Erreur lors de la génération.");
  }
};
