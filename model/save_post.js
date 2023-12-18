const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'post' },
});

const spModel = mongoose.model('save_posts', spSchema);

module.exports = spModel;