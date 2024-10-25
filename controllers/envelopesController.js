/*
// Imports Express modules and assign it to variable 'express'
const express = require('express');

// Variable 'app' is calling express() function to init Express application
const app = express();

const PORT = 3000;

// To create unique IDs for each envelopes
const { v4: uuidv4 } = require('uuid');

// Global variables
let totalBudget = 1000; // Example total budget
let envelopes = []; // Array to store budget envelopes

// Middleware to parse JSON request body
app.use(express.json());

// POST endpoint to create a budget envelope
app.post('/envelopes', (req, res) => {
    const { name, amount } = req.body; // Destructure name and amount from the request body

    // Validate request body
    if (!name || !amount) {
        return res.status(400).json({ message: 'Name and amount are required' });
    }

    // Check if the total budget allows creating this envelope
    if (amount > totalBudget) {
        return res.status(400).json({ message: 'Insufficient budget for this envelope' });
    }

    // Create the envelope
    const envelope = {
        id: uuidv4(), // Generate a unique ID for the envelope
        name,
        amount,
        remaining: amount // Set remaining to the amount initially
    };

    envelopes.push(envelope); // Add the envelope to the envelopes array
    totalBudget -= amount; // Deduct the amount from total budget

    res.status(201).json({ message: 'Envelope created', envelope });
});

// Get endpoint to retrieve ALL envelopes
app.get('/envelopes', (req, res) => {
    res.status(200).json({ totalBudget, envelopes });
});

// GET endpoint to retrieve a specific envelope by ID
app.get('/envelopes/:id', (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const envelope = envelopes.find(env => env.id === id); // Find the envelope with the matching ID

    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    res.status(200).json(envelope); // Return the found envelope
});

// DELETE endpoint to retrieve a specific envelope by ID
app.delete('/envelopes/:id', (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const envelopeIndex = envelopes.findIndex(env => env.id === id); // Find the index of the envelope

    // Check if the envelope exists
    if (envelopeIndex === -1) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    // Adjust the total budget before deleting the envelope
    totalBudget += envelopes[envelopeIndex].amount; // Restore the envelope's amount to total budget

    envelopes.splice(envelopeIndex, 1); // Remove the envelope from the envelopes array
    res.status(200).json({ message: 'Envelope deleted' }); // Respond with a success message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});*/

// Import the UUID package for unique IDs
const { v4: uuidv4 } = require('uuid');

// Global variables
let totalBudget = 1000;
let envelopes = [];

// Controller function to create a budget envelope
const createEnvelope = (req, res) => {
    const { name, amount } = req.body;

    // Validate request body
    if (!name || !amount) {
        return res.status(400).json({ message: 'Name and amount are required' });
    }

    if (amount > totalBudget) {
        return res.status(400).json({ message: 'Insufficient budget for this envelope' });
    }

    // Create the envelope
    const envelope = {
        id: uuidv4(),
        name,
        amount,
        remaining: amount,
    };

    envelopes.push(envelope);
    totalBudget -= amount;

    res.status(201).json({ message: 'Envelope created', envelope });
};

// Controller function to retrieve all envelopes
const getAllEnvelopes = (req, res) => {
    res.status(200).json({ totalBudget, envelopes });
};

// Controller function to retrieve a specific envelope by ID
const getEnvelopeById = (req, res) => {
    const { id } = req.params;
    const envelope = envelopes.find(env => env.id === id);

    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    res.status(200).json(envelope);
};

// Controller function to delete a specific envelope by ID
const deleteEnvelope = (req, res) => {
    const { id } = req.params;
    const envelopeIndex = envelopes.findIndex(env => env.id === id);

    if (envelopeIndex === -1) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    totalBudget += envelopes[envelopeIndex].amount;
    envelopes.splice(envelopeIndex, 1);

    res.status(200).json({ message: 'Envelope deleted' });
};

// Export controller functions
module.exports = {
    createEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    deleteEnvelope
};


