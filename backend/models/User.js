const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Missing username'],
    unique: [true, 'Username is already existed'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Missing password'],
    trim: true,
  },
  fullName: {
    type: String,
    // required: [true, `Missing user's full name`],
    trim: true,
  },
  phoneNumber: {
    type: String,
    // required: [true, 'Missing phone number'],
    validate: {
      validator: function (val) {
        return val.match(/^\d{10}$/);
      },
      message: 'Incorrect phone number'
    },
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (val) {
        return val.match(/^\S+@\S+\.\S+$/)
      },
    }
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
