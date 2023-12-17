const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/follow-user', (req, res) => {
    const following_id = req.body.following_id;
    const follower_id = req.body.follower_id;

    const isFollow = req.body.isFollow === '1';
    
    const insertQuery = isFollow
        ? 'INSERT INTO follow (following_id, follower_id) VALUES (?, ?)'
        : 'DELETE FROM follow WHERE following_id = ? AND follower_id = ?';
        
    db.query(insertQuery, [following_id, follower_id], (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});


module.exports = router;