// Import the PostgreSQL connection
const pool = require('../db');

// Import the UUID package for unique IDs
const { v4: uuidv4 } = require('uuid');

// Global variables
let totalBudget = 1000;
let envelopes = [];

// Controller function to create a budget envelope
const createEnvelope = async (req, res) => {
    const { name, amount } = req.body;
    
    // Generate a unique UUID for the envelope
    const id = uuidv4();

    // Validate request body
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    
    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }
    
    if (amount > totalBudget) {
        return res.status(400).json({ message: 'Insufficient budget for this envelope' });
    }

    try {
        // Insert envelope into PostgreSQL database
        const query = 'INSERT INTO envelopes (id, name, amount, remaining) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [id, name, amount, amount]);

        // Adjust the total budget
        totalBudget -= amount;

        res.status(201).json({ message: 'Envelope created', envelope: { id, name, amount, remaining: amount } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating envelope' });
    }
/*
    // Create the envelope
    const envelope = {
        id: uuidv4(),
        name: String(name),
        amount: Number(amount),
        remaining: Number(amount),
    };

    envelopes.push(envelope);
    totalBudget -= amount;

    res.status(201).json({ message: 'Envelope created', envelope });
    */
};

// Controller function to GET all envelopes
const getAllEnvelopes = async (req, res) => {
   // res.status(200).json({ totalBudget, envelopes });
    try {
        const result = await pool.query('SELECT * FROM envelopes');
        res.status(200).json({ totalBudget, envelopes: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving envelopes' });
    }
};

// Controller function to GET a specific envelope by ID
const getEnvelopeById = (req, res) => {
    const { id } = req.params;
    const envelope = envelopes.find(env => env.id === id);

    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    res.status(200).json(envelope);
};

// Controller function to DELETE a specific envelope by ID
const deleteEnvelope = (req, res) => {
    const { id } = req.params;
    const envelopeIndex = envelopes.findIndex(env => env.id === id);

    if (envelopeIndex === -1) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    totalBudget += envelopes[envelopeIndex].remaining;

    envelopes.splice(envelopeIndex, 1);

    res.status(200).json({ message: 'Envelope deleted' });
};

// Controller function to PUT a specific envelope by ID
const updateEnvelope = (req, res) => {
    const { id } = req.params;
    const { name, amount } = req.body; // Get the updated name and amount from the request body

    // Validate is amount is a Number
    if (isNaN(amount)) {
        return res.status(400).json({ message: 'Amount must be a valid number' });
    }

    // Find the envelope by its ID
    const envelope = envelopes.find(env => env.id === id);

    if (!envelope) {
        return res.status(404).json({ message: 'Envelope not found' });
    }

    // Calculate the difference between the old and new amounts
    const amountDifference = amount - envelope.amount;

    // Check if the total budget can accommodate the new amount
    if (amountDifference > totalBudget) {
        return res.status(400).json({ message: 'Insufficient budget for this update' });
    }

    // Update envelope details
    envelope.name = name || envelope.name; // Update name if provided, otherwise keep the current name
    envelope.amount = amount; // Update the amount
    envelope.remaining = amount; // Update the remaining amount as well

    // Adjust the total budget based on the difference
    totalBudget -= amountDifference;

    // Respond with the updated envelope
    res.status(200).json({ message: 'Envelope updated', envelope });
};

// Controller function to transfer amount between two envelopes
const transferAmount = (req, res) => {
    const { fromId, toId } = req.params; // Extract source and target envelope IDs from route parameters
    const { amount } = req.body; // Get transfer amount from request body

    // Validate that amount is a positive number
    if (amount <= 0) {
        return res.status(400).json({ message: 'Transfer amount must be greater than zero' });
    }

    // Find the source and target envelopes by their IDs
    const sourceEnvelope = envelopes.find(env => env.id === fromId);
    const targetEnvelope = envelopes.find(env => env.id === toId);

    // Check if both envelopes exist
    if (!sourceEnvelope) {
        return res.status(404).json({ message: 'Source envelope not found' });
    }
    if (!targetEnvelope) {
        return res.status(404).json({ message: 'Target envelope not found' });
    }

    // Check if source envelope has enough funds
    if (sourceEnvelope.remaining < amount) {
        return res.status(400).json({ message: 'Insufficient funds in source envelope' });
    }

    // Perform the transfer
    sourceEnvelope.remaining -= amount; // Deduct amount from source envelope
    targetEnvelope.remaining += amount; // Add amount to target envelope

    // Respond with updated envelopes
    res.status(200).json({
        message: 'Amount transferred successfully',
        sourceEnvelope,
        targetEnvelope
    });
};

// Export controller functions
module.exports = {
    createEnvelope,
    getAllEnvelopes,
    getEnvelopeById,
    deleteEnvelope,
    updateEnvelope,
    transferAmount
};


