const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const FILE_PATH = path.join(__dirname, 'notes.json');

app.use(express.json());
app.use(cors());

// Load notes from file
app.get('/notes', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to load notes' });

        res.json(JSON.parse(data || '[]'));
    });
});

// Save notes to file
app.post('/notes', (req, res) => {
    const notes = req.body;

    fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to save notes' });

        res.json({ success: true });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
