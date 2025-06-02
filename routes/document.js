const express = require('express');

const documentController = require('../controllers/document');

const router = express.Router();

router.get('/', documentController.getAllDocuments);
router.post('/', documentController.postDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);



module.exports = router;
