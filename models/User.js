const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    id: String,
    quiz_set_id: Schema.Types.ObjectId,
}, {
    timestamps: true
});

const model = mongoose.model('User', userSchema, 'users');

module.exports = model;