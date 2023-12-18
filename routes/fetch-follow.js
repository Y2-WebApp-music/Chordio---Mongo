const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Follow = require('../model/follow')

// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.render('/');
    }
    next();
};

router.get('/follower', requireLogin, async (req, res) => {
    const cur_id = req.session.user._id;

    const followers = await Follow.find({ following_id: new ObjectId(cur_id) }).populate('follower_id', 'username profile_image');

    const data = followers.map((follow) => ({
        user_id: follow.follower_id._id.toString(),
        username: follow.follower_id.username,
        profile_image: follow.follower_id.profile_image.data ? follow.follower_id.profile_image.data.toString('base64') : null,
    }));

    res.json(data);
});

router.get('/following', requireLogin, async (req, res) => {
    const cur_id = req.session.user._id;

    const following = await Follow.find({ follower_id: new ObjectId(cur_id) }).populate('following_id', 'username profile_image');

        const data = following.map((follow) => ({
            user_id: follow.following_id._id.toString(),
            username: follow.following_id.username,
            profile_image: follow.following_id.profile_image.data ? follow.following_id.profile_image.data.toString('base64') : null,
        }));

        res.json(data);
});

module.exports = router;