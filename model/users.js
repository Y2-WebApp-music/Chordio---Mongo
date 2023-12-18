const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    reg_date: Date,
    profile_image: { data: Buffer, contentType: String },
});

const usersModel = mongoose.model('users', userSchema);

module.exports = usersModel;