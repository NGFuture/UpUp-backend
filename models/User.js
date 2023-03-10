const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    id: String,
}, {
    timestamps: true
});

const model = mongoose.model('User', userSchema, 'users');

module.exports = model;