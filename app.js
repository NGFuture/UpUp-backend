require('dotenv').config();
require('./models/db');
const cors = require('cors');
const express = require('express');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const User = require('./models/User');
const Result = require('./models/Result');

const PORT = process.env.PORT || 3010;
const app = express();
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    if (req.headers.authuserid) {
        const user = await User.findOne({ id: req.headers.authuserid })
        req.user = user;
    };
    next();
});
const privateRoute = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
app.post('/results', privateRoute, async (req, res) => {
    const { quizId, userChoices } = req.body;
    const quiz = await Quiz.findById(quizId);
    const questions = await Question.find({
        _id: {
            $in: Object.keys(userChoices)
        }
    });
    let correctAnswers = 0;
    const results = [];
    for (const question of questions) {
        results.push({
            question_id: question._id,
            choice: userChoices[question._id],
        });
        if (question.answer === userChoices[question._id]) {
            correctAnswers += 1;
        };
    };
    const percentage = Math.round(correctAnswers * 100 / questions.length);
    const result = new Result({
        quiz_id: quizId,
        user_id: req.user._id,
        results: results,
        results_percentage: percentage,
    });
    await result.save();
    res.json({
        item: result,
    })
});
app.get('/quizzes', async (req, res) => {
    const quizzes = await Quiz.find();
    res.json(
        {
            items: quizzes,
        }
    );
});

// Endpoint for 1 quiz
app.get('/quizzes/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    res.json(
        {
            item: quiz,
        }
    );
});

app.get('/questions', async (req, res) => {
    const { quizId, skip = 0, limit = 5 } = req.query;
    const criteria = {};
    if (quizId) {
        const quiz = await Quiz.findById(quizId);
        criteria._id = {
            $in: quiz.questions
        };
    };
    const questions = await Question.find(criteria).skip(+skip).limit(+limit);
    const count = await Question.countDocuments(criteria);
    res.json(
        {
            items: questions,
            count: count,
        }
    );
});
// Endpoint for 1 question
app.get('/questions/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.json(
        {
            item: question,
        }
    );
});

app.post('/users', async (req, res) => {
    const user = new User({
        id: Date.now(),
    });
    await user.save();
    res.json({
        item: user,
    })
})

app.listen(PORT, () => {
    console.log(`started on http://localhost:${PORT}`);
});