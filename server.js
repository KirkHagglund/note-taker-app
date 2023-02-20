// Import libraries and assign variables
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create express requests

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    // Should read db.json file and return all saved notes as json
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
            return;
        }
        console.log(JSON.parse(data));
        res.json(data);
    });
});

app.post('/api/notes', (req, res) => {
    // Should receive new notes and add them to the db.json file. Use uuid to create a unique id for new entries
    
});

// Create listener function

app.listen(port, () => console.log(`Listening on port ${port}...`));