const express = require('express');

const documentController = require('../controllers/document');

const router = express.Router();

router.get('/', documentController.getAllDocuments);
router.get('/:id', documentController.getDocument);
router.post('/', documentController.postDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
