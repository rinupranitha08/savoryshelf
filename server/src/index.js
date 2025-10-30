const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.error(err));