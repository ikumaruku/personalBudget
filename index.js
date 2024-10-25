// app.js
const express = require('express');
const envelopesRouter = require('./routes/envelopes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Use the envelopes routes
app.use('/envelopes', envelopesRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
