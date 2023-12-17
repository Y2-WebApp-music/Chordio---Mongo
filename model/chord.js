const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chordSchema = new Schema({
    chord_id: Number,
    title: String,
    post_data: Date,
    img_chord: Blob,
    img_note: Blob,
    artist: String,
    song_key: String,
    Bpm: Number,
    url: String,
    img: Blob,
    likes: Number,
    type: String,
    country: String,
    user_id: Number,
});

const chordModel = mongoose.model('chord', chordSchema);

module.exports = chordModel;