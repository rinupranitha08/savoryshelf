const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// add this line to mount routes
const recipesRouter = require('./routes/recipes');
app.use('/api/recipes', recipesRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// TODO: replace with routes in routes/recipes.js
app.get('/', (req, res) => res.send('Recipe API running'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.error(err));