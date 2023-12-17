const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/chordDelete/:id', (req, res) => {
    const chordId = req.params.id;

    const sql = 'DELETE FROM chord WHERE chord_id = ?';

    db.query(sql, [chordId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Chord deleted successfully');
    });
    
    res.redirect('/song');
});


module.exports = router;