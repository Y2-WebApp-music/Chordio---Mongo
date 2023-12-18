const express = require('express');
const router = express.Router();

const Post = require('../model/post');
const LikePost = require('../model/like_post');

router.post('/likes/post', async (req, res) => {
    const post_id = req.body.post_id;
    const isIncrementing = req.body.isIncrementing === '1';
    const user_id = req.session.user._id;

    // Update post likes
    const updateQuery = isIncrementing
        ? { $inc: { likes: 1 } }
        : { $inc: { likes: -1 } };

    await Post.updateOne({ _id: post_id }, updateQuery);
    
    if (isIncrementing) {
        await LikePost.create({ user_id, post_id });
    } else {
        await LikePost.deleteOne({ user_id, post_id });
    }
});

module.exports = router;