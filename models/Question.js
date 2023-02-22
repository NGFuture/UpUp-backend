const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
    type: { type: String, default: 'SINGLE_ANSWER' },
    text: { type: String, required: true },
    options: [{ id: Number, text: String }],
    answer: { type: Schema.Types.Mixed },
}, {
    timestamps: true
});

const model = mongoose.model('Question', questionSchema, 'questions');

module.exports = model;