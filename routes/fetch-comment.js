const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/fetchcomment', (req, res) => {
    query = `SELECT *, DATE_FORMAT(comment_date, "%d %b %Y %h:%i") as commentdate FROM comments JOIN users USING(user_id) ORDER BY comment_id DESC`;

    db.query(query, (req, results) => {
        const data = results.map(async (row) => {
            const profile_image = row.profile_image ? row.profile_image.toString('base64') : null;

            return {
                user_id: row.user_id,
                post_id: row.post_id,
                comment_id: row.comment_id,
                context: row.context,
                comment_date: row.commentdate,
                username: row.username,
                profile_image: profile_image,
            }
        });
        
        Promise.all(data).then((result) => {
            res.json(result);
        });
    });
});


module.exports = router;