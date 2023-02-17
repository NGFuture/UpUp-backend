require('dotenv').config();
require('./models/db');
const express = require('express');
const Quiz = require('./models/Quiz');

const PORT = 3010;
const app = express();
app.get('/quizes', async (req, res) => {
    const quizes = await Quiz.find();
    res.json(
        {
            items: quizes,
        }
    );
});

app.listen(PORT, () => {
    console.log(`started on http://localhost:${PORT}`);
});