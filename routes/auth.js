const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('./db');
const multer = require('multer');
const upload = multer();


// Login route
router.post('/login', upload.none(), (req, res) => {
    const { user_email, user_pass } = req.body;
  
    db.query('SELECT user_id, email, password FROM users WHERE email = ?', [user_email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(user_pass, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/home');
                } else {
                    return res.status(400).json({ error: 'Incorrect password' });
                }
            });
        } else {
            return res.status(400).json({ error: 'User not found' });
        }
    });
});


// Register route
router.post('/register', upload.none(), (req, res) => {
    const { user_name, user_email, user_pass } = req.body;
    const registrationDate = new Date();

    const imagePath = 'public/img/circletest.png';

    const imageData = fs.readFileSync(imagePath);
    
    db.query('SELECT email FROM users WHERE email = ?', [user_email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // The email is already registered; handle the error here
            return res.status(400).json({ error: 'Email address is already in use.' });
        } else {
            bcrypt.hash(user_pass, 12, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                db.query('INSERT INTO users (username, email, password, reg_date, profile_image) VALUES (?, ?, ?, ?, ?)', [user_name, user_email, hash, registrationDate, imageData], (err, results) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                
                    // Registration successful; send a JSON response
                    return res.status(200).json({ message: 'Registration successful. Redirecting to login page.' });
                });
            });
        }
    });
});


module.exports = router;