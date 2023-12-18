const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const Users = require('../model/users')


// Login route
router.post('/login', upload.none(), (req, res) => {
    const { user_email, user_pass } = req.body;
  
    Users.findOne({ email: user_email })
    .select('_id email password')
    .exec()
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            } else {
                bcrypt.compare(user_pass, user.password, (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    } else if (isMatch) {
                        console.log(user)
                        req.session.user = user;
                        return res.status(200).json({ success: 'Login successful' });
                    } else {
                        return res.status(400).json({ error: 'Incorrect password' });
                    }
                });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
});


// Register route
router.post('/register', upload.none(), async (req, res) => {
    try {
        const { user_name, user_email, user_pass } = req.body;
        const registrationDate = new Date();

        const imagePath = 'public/img/circletest.png';

        const imageData = fs.readFileSync(imagePath);

        const result = await Users.find({email:user_email}).exec();
        if (result.length > 0) {
            return res.status(400).json({ error: 'Email address is already in use.' });
        } else {
            bcrypt.hash(user_pass, 12, async (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const newUser = new Users({
                    username: user_name,
                    email: user_email,
                    password: hash,
                    reg_date: registrationDate,
                    profile_image: {
                        data: imageData,
                        contentType: 'image/png'
                    }
                });
        
                await Users.create(newUser)

                return res.status(200).json({ message: 'Registration successful. Redirecting to login page.' });
            });
        }
    } catch (err) {
        console.error("error: ", err);
    }
});


module.exports = router;