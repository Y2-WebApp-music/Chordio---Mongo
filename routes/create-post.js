const express = require('express');
const router = express.Router();
const multer = require("multer");
const db = require('./db');


// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle file uploads
router.post('/create-post', upload.array('images', 4), (req, res) => {
    // Check if files were uploaded
    const imagePaths = req.files ? req.files.map((file) => file.buffer) : [];
    
    // Get text inputs
    let { cr_post_title, cr_post_detail, categoryId, tagId } = req.body;

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

    const id = req.session.user.user_id;
    const date = new Date();

    // Create an object to hold the data for insertion
    const insertData = [cr_post_title, date, cr_post_detail, imagePaths[0] || null, imagePaths[1] || null, imagePaths[2] || null, imagePaths[3] || null, id, category, tag];
    
    // Insert data into the database
    const sql = 'INSERT INTO post (title, post_date, content, img1, img2, img3, img4, user_id, category, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, insertData, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
    
    res.redirect('/');
});


module.exports = router;