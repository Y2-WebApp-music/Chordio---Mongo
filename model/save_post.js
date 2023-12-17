const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spSchema = new Schema({
    user_id: Number,
    post_id: Number,
});

const spModel = mongoose.model('save_post', spSchema);

module.exports = spModel;