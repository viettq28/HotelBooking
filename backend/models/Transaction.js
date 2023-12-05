const mongoose = require('mongoose');
const Hotel = require('./Hotel');
const User = require('./User');

const transactionSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, 'Missing user'],
    trim: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: [true, 'Missing hotel'],
  },
  rooms: [{
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: [true, 'Missing room category'],
    },
    number: {
      type: [Number],
      required: [true, 'Missing room number'],
    },
  }],
  startDate: {
    type: Date,
    default: Date.now(),
    required: [true, 'Missing starting date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Missing ending date'],
    validate: {
      validator: function (val) {
        return val >= this.startDate;
      },
      message: 'Ending date must be after starting date',
    },
  },
  price: {
    type: Number,
    required: [true, 'Missing price'],
  },
  payment: {
    type: String,
    required: [true, 'Missing payment'],
    enum: {
      values: ['credit card', 'cash'],
      message: 'Paying method must either be Credit Card or Cash',
    },
  },
  status: {
    type: String,
    required: [true, 'Missing status'],
    enum: {
      values: ['booked', 'checkin', 'checkout'],
      message: 'Status must either be Booked, Checkin or Checkout',
    },
  },
});

// Middleware
transactionSchema.post('save', function (doc, next) {
  doc.rooms.forEach(async (room) => {
    if (doc.status === 'booked' || doc.status === 'checkin') {
      const unavailableNumber = room.number.map((number) => {
        return {
          number,
          startDate: doc.startDate,
          endDate: doc.endDate,
        };
      });
      await Hotel.findOneAndUpdate(
        // { _id: doc.hotel, 'rooms.category': doc.rooms.category },
        // {
        //   $addToSet: { 'rooms.$.unavailable': { $each: unavailableNumber } },
        // }
        { name: doc.hotel },
        {
          $addToSet: { 'rooms.$[r].unavailable': { $each: unavailableNumber } },
        },
        { arrayFilters: [{ 'r.category': room.category }] }
      );
    } else {
      await Hotel.findOneAndUpdate(
        { name: doc.hotel, 'rooms.category': room.category },
        {
          $pull: {
            'rooms.$.unavailable': {
              number: { $in: room.number },
            },
          },
        }
      );
    }
  });
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
