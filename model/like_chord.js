const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lcSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    chord_id: { type: mongoose.Schema.Types.ObjectId, ref: 'chord' },
});

const lcModel = mongoose.model('like_chords', lcSchema);

module.exports = lcModel;