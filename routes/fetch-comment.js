const express = require('express');
const router = express.Router();

const Comment = require('../model/comments');

router.get('/fetchcomment', async (req, res) => {
    const comments = await Comment.find({})
        .sort({ _id: -1 })
        .populate({
            path: 'user_id',
            model: 'users',
            select: 'username profile_image',
        })
        .exec();

    const formattedComments = comments.map(comment => ({
        user_id: comment.user_id._id,
        post_id: comment.post_id,
        comment_id: comment.comment_id,
        context: comment.context,
        comment_date: formatDate(comment.comment_date),
        username: comment.user_id.username,
        profile_image: comment.user_id.profile_image.data ? comment.user_id.profile_image.data.toString('base64') : null,
    }));
    
    res.json(formattedComments);
});

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

module.exports = router;