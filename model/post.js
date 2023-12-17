const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    post_id: Number,
    title: String,
    post_data: Date,
    content: String,
    img1: Blob,
    img2: Blob,
    img3: Blob,
    img4: Blob,
    likes: Number,
    category: String,
    tag: String,
    user_id: Number,
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;