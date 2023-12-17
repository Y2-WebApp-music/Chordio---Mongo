const express = require('express');
const router = express.Router();
const multer = require("multer");
const db = require('./db');


// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Handle file uploads
router.post('/create-chord', upload.array('images', 3), (req, res) => {
    // Check if files were uploaded
    const imagePaths = req.files ? req.files.map((file) => file.buffer) : [];
    
    // Get text inputs
    const { SongName, ArtistName, Key, BPM, type, nationality, YTlink} = req.body;

    const keyMapping = {
        1: 'C',
        2: 'C# / Db',
        3: 'D', 
        4: 'D# / Eb',
        5: 'E',
        6: 'F',
        7: 'F# / Gb',
        8: 'G',
        9: 'G# / Ab',
        10: 'A',
        11: 'A# / Bb',
        12: 'B'
    };
    const key = keyMapping[Key];

    const typeMapping = {
        1: 'Pop',
        2: 'Rock',
        3: 'Soul',
        4: 'Jazz',
        5: 'R&B',
        6: 'K-pop',
        7: 'J-pop',
        8: 'T-pop',
        9: 'Anime',
        10: 'Alternative',
        11: 'Country',
        12: 'Classical',
        13: 'Indie',
        14: 'Metal',
        15: 'Hip-Hop',
        16: 'Other'
    };
    const chordType = typeMapping[type];

    const countryMapping = {
        1: 'Thai',
        2: 'Japan',
        3: 'Korea',
        4: 'National',
        5: 'other'
    }
    const country = countryMapping[nationality];

    const id = req.session.user.user_id;
    const date = new Date();

    // Create an object to hold the data for insertion
    const insertData = [SongName, date, imagePaths[1] || null, imagePaths[2] || null, ArtistName, key, BPM || null, YTlink, imagePaths[0] || null, id, chordType, country];

    // Insert data into the database
    const sql = 'INSERT INTO chord (title, post_date, img_chord, img_note, artist, song_key, Bpm, url, img, user_id, type, country) VALUES (?, ?, ?, ? , ? , ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, insertData, err => {
        if (err) {
            console.error(err);
            return;
        }
    });

    res.redirect('/song');
});


module.exports = router;