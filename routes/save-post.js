const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const SavePost = require('../model/save_post');

router.post('/saves/post', async (req, res) => {
    const post_id = req.body.post_id;
    const isIncrementing = req.body.isIncrementing === '1';
    const user_id = req.session.user._id;

    // Insert or delete save_post entry
    if (isIncrementing) {
        await SavePost.create({ user_id, post_id });
    } else {
        await SavePost.deleteOne({ user_id, post_id });
    }
});

module.exports = router;