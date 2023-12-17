const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lcSchema = new Schema({
    user_id: Number,
    chord_id: Number,
});

const lcModel = mongoose.model('like_chord', lcSchema);

module.exports = lcModel;