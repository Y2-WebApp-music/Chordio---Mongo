const express = require('express');
const router = express.Router();

const Chord = require('../model/chord');
const LikeChord = require('../model/like_chord')

router.get('/fetchchord/:id', async (req, res) => {
    const userId = req.params.id;
    const chordId = req.query.chord_id;
    const cur_id = req.session.user._id;

    let query = {};

    if (userId !== 'all') {
        query.user_id = userId;
    }

    if (chordId) {
        query._id = chordId; // Assuming chordId is the MongoDB ObjectId
    }

    let results = await Chord.find(query)
        .sort({ likes: -1 })
        .populate({ path: 'user_id', select: 'username'})
        .exec();

    const data = await Promise.all(results.map(async (chord) => {
        const img_chord = chord.img_chord.data ? chord.img_chord.data.toString('base64') : null;
        const img_note = chord.img_note.data ? chord.img_note.data.toString('base64') : null;
        const img = chord.img.data ? chord.img.data.toString('base64') : null;

        // Check if the user has liked the chord
        const isLike = await LikeChord.countDocuments({
            user_id: cur_id,
            chord_id: chord._id,
        });

        return {
            user_id: chord.user_id,
            chord_id: chord._id,
            title: chord.title,
            postdate: chord.post_date.toLocaleDateString(),
            img_chord: img_chord,
            img_note: img_note,
            img: img,
            artist: chord.artist,
            song_key: chord.song_key,
            Bpm: chord.Bpm,
            url: chord.url,
            likes: chord.likes,
            username: chord.user_id.username,
            type: chord.type,
            country: chord.country,
            isLike: isLike === 1,
        };
    }));

    res.json(data);
});

module.exports = router;