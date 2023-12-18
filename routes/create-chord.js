const express = require('express');
const router = express.Router();
const multer = require("multer");

const Chord = require('../model/chord');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file uploads
router.post('/create-chord', upload.array('images', 3), async (req, res) => {
    // Check if files were uploaded
    const imagePaths = req.files ? req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
    })) : [];
    
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

    const userId = req.session.user._id;
    const date = new Date();

    // Create an object to hold the data for insertion
    const newChord = new Chord({
        title: SongName,
        post_date: date,
        img_chord: imagePaths[1] || null,
        img_note: imagePaths[2] || null,
        artist: ArtistName,
        song_key: key,
        Bpm: BPM || null,
        url: YTlink,
        img: imagePaths[0] || null,
        user_id: userId,
        type: chordType,
        country: country,
    });

    await newChord.save();

    res.redirect('/song');
});

module.exports = router;