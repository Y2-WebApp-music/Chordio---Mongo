const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    post_date: Date,
    content: String,
    img1: { data: Buffer, contentType: String },
    img2: { data: Buffer, contentType: String },
    img3: { data: Buffer, contentType: String },
    img4: { data: Buffer, contentType: String },
    likes: Number,
    category: String,
    tag: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;