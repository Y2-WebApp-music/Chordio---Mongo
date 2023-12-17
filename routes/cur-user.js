const express = require('express');
const router = express.Router();
const db = require('./db');


// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'You are not logged in.' });
    }
    next();
};

// Route to get the current user's information
router.get('/user/info', requireLogin, (req, res) => {
    db.query('SELECT u.user_id, u.username, u.email, u.reg_date, u.profile_image, COUNT(DISTINCT p.post_id) AS num_posts, COUNT(DISTINCT c.chord_id) AS num_chords FROM users u LEFT JOIN post p ON u.user_id = p.user_id LEFT JOIN chord c ON u.user_id = c.user_id WHERE u.user_id = ? GROUP BY u.user_id', [req.session.user.user_id], (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).json({ error: 'Error fetching posts' });
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
                }
            });
            res.json(data);
        }
    });
});


module.exports = router;