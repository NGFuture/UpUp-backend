const mongoose = require('mongoose');

const { Schema } = mongoose;

const quizSetSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  quiz_ids: [Schema.Types.ObjectId]
}, {
  timestamps: true
});

const model = mongoose.model('QuizSet', quizSetSchema, 'quizSets');

module.exports = model;