const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: Number,
    username: String,
    password: String,
    email: String,
    reg_date: Date,
    profile_image: Blob,
});

const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;