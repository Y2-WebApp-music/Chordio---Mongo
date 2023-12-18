const express = require('express');
const router = express.Router();

const Comment = require('../model/comments')

router.post('/create-comment/:post_id', async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.session.user._id;
    const context = req.body.context;
    const date = new Date();
    
    const newComment = new Comment({
        context: context,
        comment_date: date,
        user_id: user_id,
        post_id: post_id,
    });

    // Save the comment to the database
    await newComment.save();

    res.status(200).send('Comment created successfully');
});


module.exports = router;