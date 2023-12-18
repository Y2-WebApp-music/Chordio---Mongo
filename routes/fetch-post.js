const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../model/post')
const LikePost = require('../model/like_post');
const SavePost = require('../model/save_post');
const ObjectId = mongoose.Types.ObjectId;


router.get('/fetchpost/:id', async (req, res) => {
    let query;

    if (req.params.id == 'all') {
        query = Post.find({})
            .sort({ _id: 'desc' })
            .populate({ path: 'user_id', select: 'username profile_image'})
            .exec();
    } else {
        query = Post.find({ _id: new ObjectId(req.params.id) })
            .sort({ _id: 'desc' })
            .populate({ path: 'user_id', select: 'username profile_image'})
            .exec();
    }

    const results = await query;

    const data = await Promise.all(results.map(async (post) => {
    const img1 = post.img1.data ? post.img1.data.toString('base64') : null;
        const img2 = post.img2.data ? post.img2.data.toString('base64') : null;
        const img3 = post.img3.data ? post.img3.data.toString('base64') : null;
        const img4 = post.img4.data ? post.img4.data.toString('base64') : null;

        // Check if the user has liked the post
        const likeResult = await LikePost.countDocuments({
            user_id: req.session.user.user_id,
            post_id: post.post_id,
        });

        // Check if the user has saved the post
        const saveResult = await SavePost.countDocuments({
            user_id: req.session.user.user_id,
            post_id: post.post_id,
        });

        return {
            user_id: post.user_id,
            post_id: post.post_id,
            title: post.title,
            postdate: post.post_date.toLocaleDateString(),
            content: post.content,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            likes: post.likes,
            category: post.category,
            tag: post.tag,
            username: post.user_id.username,
            profile_image: post.user_id.profile_image.data ? post.user_id.profile_image.data.toString('base64') : null,
            isLike: likeResult === 1,
            isSave: saveResult === 1,
        };
    }));

    res.json(data);
});


module.exports = router;