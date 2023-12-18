const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../model/users')

// Route to get the current user's information
router.get('/otheruser/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    const userIdAsObjectId = new ObjectId(user_id);

    const user = await User.aggregate([
        {
            $match: { _id: userIdAsObjectId },
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'user_id',
                as: 'posts',
            },
        },
        {
            $lookup: {
                from: 'chords',
                localField: '_id',
                foreignField: 'user_id',
                as: 'chords',
            },
        },
        {
            $group: {
                _id: '$_id',
                username: { $first: '$username' },
                email: { $first: '$email' },
                reg_date: { $first: '$reg_date' },
                profile_image: { $first: '$profile_image' },
                num_posts: { $sum: { $size: '$posts' } },
                num_chords: { $sum: { $size: '$chords' } }
            }
        }
    ]);

    if (user.length === 0) {
        console.log('User not found');
        return res.status(404).send('User not found');
    }
    
    const userWithIdAsString = {
        ...user[0],
        user_id: userIdAsObjectId.toString(),
    };

    res.json(userWithIdAsString);
});

module.exports = router;