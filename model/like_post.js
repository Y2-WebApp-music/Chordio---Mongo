const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lpSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
});

const lpModel = mongoose.model('like_posts', lpSchema);

module.exports = lpModel;