const { Pool } = require('pg'); // Import Pool from pg package

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'ikmal', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'personal_budget', // The database you created
    port: 5432, // Default port for PostgreSQL
});

// Test connection
pool.connect()
    .then(() => console.log('Connected to the PostgreSQL database'))
    .catch(err => console.error('Error connecting to the database', err.stack));

module.exports = pool; // Export pool to use in other files
