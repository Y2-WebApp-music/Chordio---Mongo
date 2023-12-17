const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/saves/post', (req, res) => {
    const post_id = req.body.post_id;
    const isIncrementing = req.body.isIncrementing === '1';
    const user_id = req.session.user.user_id;

    const insertQuery = isIncrementing
        ? 'INSERT INTO save_post (user_id, post_id) VALUES (?, ?)'
        : 'DELETE FROM save_post WHERE user_id = ? AND post_id = ?';
        
    db.query(insertQuery, [user_id, post_id], (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
});


module.exports = router;