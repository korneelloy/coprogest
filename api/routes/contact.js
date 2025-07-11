const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', async (req, res) => {
  const { subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true, // connexion via SSL
      auth: {
        user: 'slaamri@yahoo.fr',
        pass: 'ioml-obtl-fcrc-bast' // mot de passe d’application Yahoo
      }
    });

    await transporter.sendMail({
      from: '"Coprogest" <slaamri@yahoo.fr>',        // ← adresse expéditeur
      to: ['laamrisaid@gmail.com', 'korneelloy@gmail.com'],                              // ← destinataire (gestionnaire)
      subject,
      text: message
    });

    res.status(200).send('Email envoyé avec succès.');
  } catch (err) {
    console.error('Erreur lors de l’envoi du mail :', err);
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;
