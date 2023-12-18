const express = require('express');
const router = express.Router();
const multer = require("multer");
const sharp = require('sharp');

const User = require('../model/users');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/edit-user', upload.single('image'), async (req, res) => {
    const user = req.session.user;
    const user_id = user._id;

    let processedImageBuffer;

    // Check if files were uploaded
    if (req.file) {
        const imageBuffer = req.file.buffer;
        processedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 300, height: 300, fit: 'cover' })
            .toBuffer();
    }

    const { username, email } = req.body;

    let updateFields = { username, email };

    if (processedImageBuffer) {
        updateFields.profile_image = {
            data: processedImageBuffer,
            contentType: req.file.mimetype
        };
    }

    // Update the user's information in the database
    await User.findByIdAndUpdate(user_id, updateFields);

    res.redirect('/setting');
});

module.exports = router;