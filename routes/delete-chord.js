const express = require('express');
const router = express.Router();

const Chord = require('../model/chord');

router.post('/chordDelete/:id', async (req, res) => {
    const chordId = req.params.id;

    const result = await Chord.findByIdAndDelete(chordId);

    if (!result) {
        return res.status(404).send('Chord not found');
    }

    res.redirect('/song');
});

module.exports = router;