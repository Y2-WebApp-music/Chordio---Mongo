const express = require('express');
const router = express.Router();
const multer = require("multer");
const sharp = require('sharp');
const db = require('./db');


// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/edit-user', upload.single('image'), async (req, res) => {
    const user = req.session.user;
    const user_id = user.user_id;

    let processedImageBuffer;

    // Check if files were uploaded
    if (req.file) {
        const imageBuffer = req.file.buffer;
        processedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 300, height: 300, fit: 'cover' })
            .toBuffer();
    }

    const { username, email } = req.body;

    let query = 'UPDATE users SET username = ?, email = ?, profile_image = ? WHERE user_id = ?';
    let data = [username, email, processedImageBuffer, user_id];

    if (!processedImageBuffer) {
        query = 'UPDATE users SET username = ?, email = ? WHERE user_id = ?';
        data = [username, email, user_id];
    }

    db.query(query, data, err => {
        if (err) {
            console.error(err);
            return;
        }
    });

    res.redirect('/setting');
});


module.exports = router;