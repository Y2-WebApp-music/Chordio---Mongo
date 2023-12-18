const express = require('express');
const router = express.Router();

const Chord = require('../model/chord');
const LikeChord = require('../model/like_chord')

router.post('/likes/chord', async (req, res) => {
    const chord_id = req.body.chord_id;
    const isIncrementing = req.body.isIncrementing === '1';
    const user_id = req.session.user._id;

     const updateQuery = isIncrementing
            ? { $inc: { likes: 1 } }
            : { $inc: { likes: -1 } };

    await Chord.updateOne({ _id: chord_id }, updateQuery);
    
    // Insert or delete like record in the LikeChord collection
    if (isIncrementing) {
        await LikeChord.create({ user_id, chord_id });
    } else {
        await LikeChord.deleteOne({ user_id, chord_id });
    }
});


module.exports = router;