const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    context: String,
    comment_data: Date,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
});

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;