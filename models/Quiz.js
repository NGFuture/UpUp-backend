const mongoose = require('mongoose');

const { Schema } = mongoose;

const quizSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  description:   String,
  questions: [Schema.Types.ObjectId]
}, {
  timestamps: true
});

const model = mongoose.model('Quiz', quizSchema, 'quizzes');

module.exports = model;
