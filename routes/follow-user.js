const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Follow = require('../model/follow')

router.post('/follow-user', async (req, res) => {
    
    let { following_id, follower_id, isFollow } = req.body;

    following_id = new ObjectId(following_id);
    follower_id = new ObjectId(follower_id);

    if (isFollow === '1') {
        // Follow the user
        await Follow.create({ following_id, follower_id });
    } else {
        // Unfollow the user
        await Follow.findOneAndDelete({ following_id, follower_id });
    }

    res.sendStatus(200);
});


module.exports = router;