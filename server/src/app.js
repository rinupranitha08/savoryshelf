const express = require('express');
const cors = require('cors');

const recipesRouter = require('./routes/recipes');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('Recipe API running'));

module.exports = app;
