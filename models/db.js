const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION, {useNewUrlParser: true});