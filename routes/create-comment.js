const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/create-comment/:post_id', (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.session.user.user_id;
    const context = req.body.context;
    const date = new Date();
    const insertData = [context, date, user_id, post_id];

    const query = 'INSERT INTO comments (context, comment_date, user_id, post_id) VALUES (?, ?, ?, ?)';

    db.query(query, insertData, err => {
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    })

    res.status(200).send('Comment created successfully');
});


module.exports = router;