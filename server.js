// Import libraries and assign variables

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Create express requests

app.get('', (req, res) => {
    res.send('Hello World!');
});

// Create listener function

app.listen(port, () => console.log(`Listening on port ${port}...`));