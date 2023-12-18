const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const app = express();

const Users = require('./model/users');
const Post = require('./model/post');
const Chord = require('./model/chord');
const Comment = require('./model/comments');
const Follow = require('./model/follow');
const LC = require('./model/like_chord');
const LP = require('./model/like_post');
const SP = require('./model/save_post');


app.use(cors());

app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nwibvqh.mongodb.net/music`,);

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

connection.once("open", () => {
    console.log("MongoDB database connected.");
});

// Middleware
app.use(
    cookieSession({
        name: 'session',
        keys: ['your-secret-key'],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);


// Serve static files (CSS, JavaScript, etc.)
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


// Import route files
const authRoutes = require('./routes/auth');

const curUser = require('./routes/cur-user');
/*
const otherUser = require('./routes/other-user');
const otherView = require('./routes/other-view');
*/
const homeRoutes = require('./routes/home');

const fetchPosts = require('./routes/fetch-post');
const fetchComments = require('./routes/fetch-comment');
const fetchChords = require('./routes/fetch-chord');
/*
const chordView = require('./routes/fetch-chord-view');
*/

const createPost = require('./routes/create-post');
const createChord = require('./routes/create-chord');
const createComment = require('./routes/create-comment');
/*
const deleteChord = require('./routes/delete-chord');
*/

const likesPost = require('./routes/like-post');
/*
const likesChord = require('./routes/like-chord');
*/
const savesPost = require('./routes/save-post');
/*
const editInfo = require('./routes/edit-user');
const editPass = require('./routes/edit-pass');

const follower = require('./routes/fetch-follow');
const follow = require('./routes/follow-user');
*/

// Use route files
app.use('/', authRoutes);

app.use('/', curUser);
/*
app.use('/', otherUser);
app.use('/', otherView);
*/
app.use('/', homeRoutes);

app.use('/', fetchPosts);
app.use('/', fetchComments);
app.use('/', fetchChords);
/*
app.use('/', chordView);
*/
app.use('/', createPost);
app.use('/', createChord);
app.use('/', createComment);
/*
app.use('/', deleteChord);
*/
app.use('/', likesPost);
/*
app.use('/', likesChord);
*/
app.use('/', savesPost);
/*
app.use('/', editInfo);
app.use('/', editPass);

app.use('/', follower);
app.use('/', follow);
*/

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});