const express = require('express');
const router = express.Router();
const envelopesController = require('../controllers/envelopesController'); // Import controller functions

// POST endpoint to create a budget envelope
router.post('/', envelopesController.createEnvelope);

// GET endpoint to retrieve ALL envelopes
router.get('/', envelopesController.getAllEnvelopes);

// GET endpoint to retrieve a specific envelope by ID
router.get('/:id', envelopesController.getEnvelopeById);

// DELETE endpoint to delete a specific envelope by ID
router.delete('/:id', envelopesController.deleteEnvelope);

// UPDATE endpoint to delete a specific envelope by ID
router.update('/:id', envelopesController.updateEnvelope);

module.exports = router;
