const express = require('express');
const router = express.Router();
const multer = require("multer");
const sharp = require('sharp');

const Post = require('../model/post');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file uploads
router.post('/create-post', upload.array('images', 4), async (req, res) => {
    // Check if files were uploaded
    const images = req.files ? await Promise.all(req.files.map(processImage)) : [];

    async function processImage(file) {
        // Resize the image using sharp or another image processing library
        const resizedImageBuffer = await sharp(file.buffer).resize({ width: 512 }).toBuffer();
        
        return {
            data: resizedImageBuffer,
            contentType: file.mimetype,
        };
    }

    // Get text inputs
    let { cr_post_title, cr_post_detail, categoryId, tagId } = req.body;

    // Map category and tag
    const categoryMapping = {
        1: 'Theory',
        2: 'Sound engineer',
        3: 'Band',
        4: 'Guitar',
        5: 'Vocal',
        6: 'Bass',
        7: 'Drum',
        8: 'Piano',
        9: 'String',
        10: 'Brass',
        11: 'other'
    };
    const category = categoryMapping[categoryId];
    
    const tagMapping = {
        'post-1': 'Question',
        'post-2': 'Article',
    };
    const tag = tagMapping[tagId];

    // Replace new lines with HTML line breaks
    cr_post_title = cr_post_title.replace(/\n/g, '<br>'); 
    cr_post_detail = cr_post_detail.replace(/\n/g, '<br>');

    const user_id = req.session.user._id;
    const post_date = new Date();
    const newPost = new Post({
        title: cr_post_title,
        post_date: post_date,
        content: cr_post_detail,
        img1: images[0],
        img2: images[1],
        img3: images[2],
        img4: images[3],
        likes: 0,
        category: category,
        tag: tag,
        user_id: user_id,
    });

    await newPost.save();
});


module.exports = router;