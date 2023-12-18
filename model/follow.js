const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    following_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    follower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const followModel = mongoose.model('follows', followSchema);

module.exports = followModel;