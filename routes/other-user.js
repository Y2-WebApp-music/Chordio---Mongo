const express = require('express');
const router = express.Router();
const db = require('./db');


// Route to get the current user's information
router.get('/otheruser/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    const query = 'SELECT u.user_id, u.username, u.email, u.reg_date, u.profile_image, COUNT(DISTINCT p.post_id) AS num_posts, COUNT(DISTINCT c.chord_id) AS num_chords FROM users u LEFT JOIN post p ON u.user_id = p.user_id LEFT JOIN chord c ON u.user_id = c.user_id WHERE u.user_id = ? GROUP BY u.user_id'

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error(err);
        } else {
            const data = results.map((row) => {
                const profile_image = row.profile_image ? row.profile_image.toString('base64') : null;
                return {
                    user_id: row.user_id,
                    username: row.username,
                    email: row.email,
                    reg_date: row.reg_date,
                    profile_image: profile_image,
                    num_posts: row.num_posts,
                    num_chords: row.num_chords,
                };
            });
            res.json(data);
        };      
    });
});


module.exports = router;