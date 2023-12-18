const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Users = require('../model/users')
const ObjectId = mongoose.Types.ObjectId;

// Middleware to check if the user is authenticated
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'You are not logged in.' });
    }
    next();
};

// Route to get the current user's information
router.get('/user/info', requireLogin, async (req, res) => {
    const result = await Users.aggregate([
        {
            $match: { _id: new ObjectId(req.session.user._id) }
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'user_id',
                as: 'post'
            }
        },
        {
            $lookup: {
                from: 'chords',
                localField: '_id',
                foreignField: 'user_id',
                as: 'chord'
            }
        },
        {
            $group: {
                _id: '$_id',
                username: { $first: '$username' },
                email: { $first: '$email' },
                reg_date: { $first: '$reg_date' },
                profile_image: { $first: '$profile_image' },
                num_posts: { $sum: { $size: '$post' } },
                num_chords: { $sum: { $size: '$chord' } }
            }
        }
    ]).exec();

    if (result.length > 0) {
        const data = result.map((row) => {
            const profile_image = row.profile_image ? row.profile_image.data.toString('base64') : null;
            
            return {
                user_id: row._id,
                username: row.username,
                email: row.email,
                reg_date: row.reg_date,
                profile_image: profile_image,
                num_posts: row.num_posts,
                num_chords: row.num_chords,
            }
        });
        res.json(data);
    } else {
        res.status(500).json({ error: 'Error fetching user' });
    }   
});


module.exports = router;