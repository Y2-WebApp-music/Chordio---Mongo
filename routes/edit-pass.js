const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer();

const User = require('../model/users');

router.post('/edit-pass', upload.none(), async (req, res) => {
    const user = req.session.user;
    const { npassword, password, cpassword } = req.body;

    const isMatch = await bcrypt.compare(npassword, user.password);

    if (isMatch) {
        if (password === cpassword) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Update the user's password in the database
            await User.findByIdAndUpdate(user._id, { password: hashedPassword });

            // Update the password in the session
            req.session.user.password = hashedPassword;

            res.status(200).send({ message: 'Password changed successfully' });
        } else {
            res.status(400).send({ error: 'Passwords do not match' });
        }
    } else {
        res.status(400).send({ error: 'Current password is incorrect' });
    }
});


module.exports = router;