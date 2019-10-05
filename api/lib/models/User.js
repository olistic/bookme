'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const saltWorkFactor = 10;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
});

userSchema.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Compare the given plain-text password with the user's password.
 *
 * @param {string} password A plain-text password.
 *
 * @return {boolean} Whether the password matches or not.
 */
userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.password);
};

/**
 * Hash the user's password.
 */
async function hashPassword() {
  const user = this;

  if (!user.password || !user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(saltWorkFactor);
  user.password = await bcrypt.hash(user.password, salt);
}
userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
