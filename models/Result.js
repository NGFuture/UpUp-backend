const mongoose = require('mongoose');

const { Schema } = mongoose;

const resultSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    results: [{ question_id: Schema.Types.ObjectId, choice: Schema.Types.Mixed}],
    results_percentage: { type: Number},
}, {
    timestamps: true
});

const model = mongoose.model('Result', resultSchema, 'results');

module.exports = model;
