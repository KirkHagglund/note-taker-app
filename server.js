// Import libraries and assign variables
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Create express requests

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/notes/', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/api/notes', (req, res) => {
    // Should read db.json file and return all saved notes as json
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
            return;
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    // Should receive new notes and add them to the db.json file. Use uuid to create a unique id for new entries
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if(error) {
            console.log(error);
            return;
        }
        const notes = JSON.parse(data);
        const newPost = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        };
        notes.push(newPost);
        console.log(notes);
        res.json(notes);
        const newNotes = JSON.stringify(notes); 
        fs.writeFile('./db/db.json', newNotes, (error) => {
            if (error) {
                console.log(error)
            }
            console.log('Success');
        });
    });
});

// Create listener function

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));