const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chordSchema = new Schema({
    title: String,
    post_date: Date,
    img_chord: { data: Buffer, contentType: String },
    img_note: { data: Buffer, contentType: String },
    artist: String,
    song_key: String,
    Bpm: Number,
    url: String,
    img: { data: Buffer, contentType: String },
    likes: Number,
    type: String,
    country: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

const chordModel = mongoose.model('chords', chordSchema);

module.exports = chordModel;