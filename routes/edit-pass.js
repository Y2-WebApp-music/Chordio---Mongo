const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db');
const multer = require('multer');
const upload = multer();


router.post('/edit-pass', upload.none(), (req, res) => {
    const user = req.session.user;
    const { npassword, password, cpassword } = req.body;

    bcrypt.compare(npassword, user.password, (err, isMatch) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        if(isMatch) {
            if(password === cpassword) {
                bcrypt.hash(password, 12, (err, hash) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ error: 'Internal Server Error' });
                    }

                    const query = 'UPDATE users SET password = ? WHERE user_id = ?'
                    const data = [hash, user.user_id];

                    db.query(query, data, err => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send({ error: 'Internal Server Error' });
                        }

                        req.session.user.password = hash;
                        
                        res.status(200).send({ message: 'Password changed successfully' });
                    });
                });
            } else {
                return res.status(400).send({ error: 'Passwords do not match' });
            }
        } else {
            return res.status(400).send({ error: 'Current password is incorrect' });
        }
    });
});


module.exports = router;