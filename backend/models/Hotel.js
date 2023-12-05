const mongoose = require('mongoose');
const AppError = require('../utils/AppError');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'A hotel must have a type'],
    enum: {
      values: ['hotel', 'apartment', 'resort', 'villa', 'cabin'],
      message: 'Type is either: Hotel, Apartment, Resort, Villa, Cabin',
    },
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Missing city'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Missing address'],
    trim: true,
  },
  distance: {
    type: Number,
    required: [true, 'Missing distance to central'],
  },
  photos: {
    type: [String],
    required: [true, 'Missing photos'],
  },
  desc: {
    type: String,
    required: [true, 'A hotel must have descriptions'],
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above is 0.0'],
    max: [5, 'Rating must be below is 5.0'],
  },
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rooms: [
    {
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
      unavailable: {
        type: [
          {
            number: Number,
            startDate: Date,
            endDate: Date,
          },
        ],
        default: [],
      },
    },
  ],
});

hotelSchema.pre(/^delete|delete$/i, async function (next) {
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
      $match: {
        $and: [
          { _id: condition() },
          { 'rooms.unavailable': { $gt: { $size: 0 } } },
        ],
      },
    },
    {
      $group: {
        _id: null,
        name: { $push: '$name' },
      },
    },
  ]);
  if (!!booked[0]?.name) {
    return next(new AppError(`Hotel ${booked[0].name.join(', ')} is in use !!!`, 400));
  }
  return next();
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
