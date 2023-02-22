require('dotenv').config();
require('./models/db');
const cors = require('cors');
const express = require('express');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');

const PORT = process.env.PORT || 3010;
const app = express();
app.use(cors());
app.get('/quizzes', async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(
        {
            items: quizzes,
        }
    );
});
// Endpoint for 1 quiz
app.get('/quizzes/:id', async(req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    res.json(
        {
            item: quiz,
        }
    );
});

app.get('/questions', async (req, res) => {
    const {quizId} = req.query;
    const criteria = {};
    if (quizId) {
        const quiz = await Quiz.findById(quizId);
        criteria._id = {
            $in: quiz.questions
        };
    };
    const questions = await Question.find(criteria);
    res.json(
        {
            items: questions,
        }
    );
});
// Endpoint for 1 question
app.get('/questions/:id', async(req, res) => {
    const question = await Question.findById(req.params.id);
    res.json(
        {
            item: question,
        }
    );
});

app.listen(PORT, () => {
    console.log(`started on http://localhost:${PORT}`);
});