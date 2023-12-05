const Hotel = require('./Hotel');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Missing title'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Missing price'],
  },
  maxPeople: {
    type: Number,
    required: [true, `Must have max number`],
  },
  desc: {
    type: String,
    required: [true, 'Missing description'],
    trim: true,
  },
  roomNumbers: {
    type: [Number],
    required: [true, 'Missing room list'],
  },
});

roomSchema.pre(/^delete|delete$/i, async function (next) {
  const condition = () => {
    if (this._conditions._id?.['$in']) {
      return {
        $in: this._conditions._id['$in'].map(
          (id) => new mongoose.Types.ObjectId(id)
        ),
      };
    }
    return new mongoose.Types.ObjectId(this._conditions._id);
  };
  const booked = await Hotel.aggregate([
    {
      $unwind: '$rooms',
    },
    { $match: { 'rooms.unavailable': { $gt: { $size: 0 } } } },
    {
      $group: {
        _id: '$rooms.category',
        name: { $push: '$name' },
      },
    },
    {
      $match: { _id: condition() },
    },
  ]);
  if (!!booked.length)
    return next(
      new AppError(
        `This room is in use by hotel: ${booked[0].name.join(', ')}. Can't be delete !!!`,
        400
      )
    );
  return next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
