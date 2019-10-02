'use strict';

const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodb = async () => {
  const db = mongoose.connection;
  db.once(
    'connected',
    () => console.log('[mongodb]', `Connected to: ${db.host}:${db.port}/${db.name}`), // eslint-disable-line no-console
  );

  await mongoose.connect(uri, options);

  return db;
};

module.exports = mongodb;
