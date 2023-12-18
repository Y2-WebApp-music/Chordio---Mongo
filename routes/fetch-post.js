const express = require('express');
const router = express.Router();
const db = require('./db');

const Post = require('../model/post')


// Function to promisify the database query
const queryAsync = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

router.get('/fetchpost/:id', (req, res) => {
    if(req.params.id == 'all') {
        query = 'SELECT *, DATE_FORMAT(post_date, "%d %b %Y %h:%i") as postdate FROM post JOIN users USING(user_id) ORDER BY post_id DESC';
    } else {
        query = `SELECT *, DATE_FORMAT(post_date, "%d %b %Y %h:%i") as postdate FROM post JOIN users USING(user_id) WHERE user_id=${req.params.id} ORDER BY post_id DESC`;
    }

    db.query(query, (err, results) => {
        if (err) {
            throw err;
        } else {
            const data = results.map(async (row) => {
                const img1 = row.img1 ? row.img1.toString('base64') : null;
                const img2 = row.img2 ? row.img2.toString('base64') : null;
                const img3 = row.img3 ? row.img3.toString('base64') : null;
                const img4 = row.img4 ? row.img4.toString('base64') : null;
                const profile_image = row.profile_image ? row.profile_image.toString('base64') : null;
                
                // Check if the user has liked the post
                const likeQuery = `SELECT COUNT(*) as isLike FROM like_post WHERE user_id=${req.session.user.user_id} AND post_id=${row.post_id}`;
                const likeResult = await queryAsync(likeQuery);

                // Check if the user has liked the post
                const saveQuery = `SELECT COUNT(*) as isSave FROM save_post WHERE user_id=${req.session.user.user_id} AND post_id=${row.post_id}`;
                const saveResult = await queryAsync(saveQuery);
                
                return {
                    user_id: row.user_id,
                    post_id: row.post_id,
                    title: row.title,
                    postdate: row.postdate,
                    content: row.content,
                    img1: img1,
                    img2: img2,
                    img3: img3,
                    img4: img4,
                    likes: row.likes,
                    category: row.category,
                    tag: row.tag,
                    username: row.username,
                    profile_image: profile_image,
                    isLike: likeResult[0].isLike === 1,
                    isSave: saveResult[0].isSave === 1,
                };
            });

            Promise.all(data).then((result) => {
                res.json(result);
            });
        }
    });
});


module.exports = router;