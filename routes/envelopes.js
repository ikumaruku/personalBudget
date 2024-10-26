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

// PUT endpoint to delete a specific envelope by ID
router.put('/:id', envelopesController.updateEnvelope);

// POST endpoint to transfer values from one envelope to another
router.post('/transfer/:fromId/:toId', envelopesController.transferAmount);

module.exports = router;
