const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lpSchema = new Schema({
    user_id: Number,
    post_id: Number,
});

const lpModel = mongoose.model('like_post', lpSchema);

module.exports = lpModel;