const express = require('express');
const router = express.Router();



router.post('/likes/post', (req, res) => {
    const post_id = req.body.post_id;
    const isIncrementing = req.body.isIncrementing === '1';
    const user_id = req.session.user.user_id;
    const updateQuery = isIncrementing
        ? 'UPDATE post SET likes = likes + 1 WHERE post_id = ?'
        : 'UPDATE post SET likes = likes - 1 WHERE post_id = ?';
    
    db.query(updateQuery, [post_id], err => {
        if (err) {
            console.error(err);
            return;
        }
        const insertQuery = isIncrementing
            ? 'INSERT INTO like_post (user_id, post_id) VALUES (?, ?)'
            : 'DELETE FROM like_post WHERE user_id = ? AND post_id = ?';
        
        db.query(insertQuery, [user_id, post_id], (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
});


module.exports = router;