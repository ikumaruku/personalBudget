# Personal Budget API

A simple RESTful API for managing personal budgets. This API allows users to create, view, update, delete budget envelopes, and transfer funds between them. It’s built using Node.js and Express.js.

## Table of Contents

1. Features
2. Tech Stack
3. Setup
   - Prerequisites
   - Installation
   - Running the Server
4. API Endpoints
   - Envelopes
   - Transfer Amounts
5. Best Practices
6. Future Enhancements
7. License


## Features

- **Create** budget envelopes with a unique name and amount.
- **View** all envelopes or a specific envelope by ID.
- **Update** the details of an envelope.
- **Delete** an envelope and reallocate its remaining amount to the total budget.
- **Transfer** funds between envelopes while validating constraints.


## Tech Stack

- **Node.js** - JavaScript runtime.
- **Express.js** - Web framework for Node.js.
- **PostgreSQL** - Database.
- **UUID** - Generate unique IDs for envelopes.


## Setup

### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- Git


### Installation

Clone the repository:

``git clone https://github.com/your-username/personalBudget.git``

``cd personalBudget``

Install dependencies:

``npm install``

### Running the Server

Start the server:

``node app.js``

The server will run on http://localhost:3000.


## API Endpoints

### Envelopes

**1. Create an Envelope**

- Endpoint: POST /envelopes
- Description: Create a new budget envelope.

Request Body:

``{
    "name": "Rent",
    "amount": 500
}``

Response:

``{
    "message": "Envelope created",
    "envelope": {
        "id": "unique-id",
        "name": "Rent",
        "amount": 500,
        "remaining": 500
    }
}``

**2. Get All Envelopes**
- Endpoint: GET /envelopes
- Description: Retrieve all budget envelopes and the total budget.

Response:

``{
    "totalBudget": 1000,
    "envelopes": [
        {
            "id": "unique-id",
            "name": "Rent",
            "amount": 500,
            "remaining": 500
        }
    ]
}``

**3. Get Envelope by ID**
- Endpoint: GET /envelopes/:id
- Description: Retrieve a specific envelope by its unique ID.

**4. Update an Envelope**
- Endpoint: PUT /envelopes/:id
- Description: Update the details of an envelope.

**5. Delete an Envelope**
- Endpoint: DELETE /envelopes/:id
- Description: Delete an envelope and reallocate its remaining amount to the total budget.

### Transfer Amounts

**Transfer Funds Between Envelopes**
- Endpoint: POST /envelopes/transfer/:fromId/:toId
- Description: Transfer a specific amount from one envelope to another.

Request Body:

``{
    "amount": 100
}``

Response:

``{
    "message": "Amount transferred successfully",
    "sourceEnvelope": {
        "id": "source-id",
        "remaining": 400
    },
    "targetEnvelope": {
        "id": "target-id",
        "remaining": 600
    }
}``


## Best Practices

- Ensure all amounts are numeric when sending data to the API.
- Use validation middleware to ensure robust input validation.
- Maintain unique IDs for envelopes to avoid duplication.
- Consider implementing persistent storage (e.g., PostgreSQL or MongoDB) for better scalability.


## Future Enhancements

- Implement user authentication for secure access.
- Build a front-end application to interact with the API.
- Add reporting capabilities (e.g., spending analysis).
