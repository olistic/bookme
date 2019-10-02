'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
