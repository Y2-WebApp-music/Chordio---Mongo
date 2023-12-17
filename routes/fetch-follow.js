const express = require('express');
const router = express.Router();
const db = require('./db');


// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.render('/');
    }
    next();
};

router.get('/follower', requireLogin, (req, res) => {
    const cur_id = req.session.user.user_id;

    const query = `SELECT f.follower_id, u.username, u.profile_image FROM follow f join users u ON f.follower_id = u.user_id WHERE following_id = ${cur_id}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            const data = results.map((row) => {
                const profile_image = row.profile_image ? row.profile_image.toString('base64') : null;

                return {
                    user_id: row.follower_id,
                    username: row.username,
                    profile_image: profile_image,
                }
            });
            res.json(data);
        }
    });
});

router.get('/following', requireLogin, (req, res) => {
    const cur_id = req.session.user.user_id;

    const query = `SELECT f.following_id, u.username, u.profile_image FROM follow f join users u ON f.following_id = u.user_id WHERE follower_id = ${cur_id}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            const data = results.map((row) => {
                const profile_image = row.profile_image ? row.profile_image.toString('base64') : null;

                return {
                    user_id: row.following_id,
                    username: row.username,
                    profile_image: profile_image,
                }
            });
            res.json(data);
        }
    });
});


module.exports = router;