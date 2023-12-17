const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment_id: Number,
    context: String,
    comment_data: Date,
    user_id: Number,
    post_id: Number,
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;