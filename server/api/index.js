const mongoose = require('mongoose');
const app = require('../src/app');

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = process.env.MONGO_URI;
    cached.promise = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = async (req, res) => {
  await connect();
  return app(req, res);
};
