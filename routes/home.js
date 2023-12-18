const express = require('express');
const router = express.Router();
const path = require('path');

// Defult page route
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    }
});

// Home route
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
    } else {
        res.redirect('/');
    }
});

// Song route
router.get('/song', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'song.html'));
    } else {
        res.redirect('/');
    }
});

// Create Chord page route
router.get('/chordcreate', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'chordcreate.html'));
    } else {
        res.redirect('/');
    }
});

// User profile route
router.get('/userprofile', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'userprofile.html'));
    } else {
        res.redirect('/');
    }
});

// Chord Like route
router.get('/chordlike', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'chordlike.html'));
    } else {
        res.redirect('/');
    }
});

// Post save route
router.get('/postsave', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'postsave.html'));
    } else {
        res.redirect('/');
    }
});

// User chord route
router.get('/userchord', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'userchord.html'));
    } else {
        res.redirect('/');
    }
});

// Setting route
router.get('/setting', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'setting.html'));
    } else {
        res.redirect('/');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    // Clear the session data and redirect to the login page
    req.session = null;
    res.redirect('/');
});

module.exports = router;