const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');
dotenv.config({ path: path.join(__dirname, '..', 'config.env') });

const db = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(console.log('database connection successful'));

// Read File Data
const hotels = JSON.parse(fs.readFileSync(`${__dirname}/hotels.json`, 'utf8'));
const rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf8'));

// Import Data
if (process.argv[2].startsWith('--import')) {
  (async () => {
    try {
      if (process.argv[2].split('--import')[1] === '-room') {
        await Room.create(rooms);
      }
      if (process.argv[2].split('--import')[1] === '-hotel') {
        await Hotel.create(hotels);
      }
      console.log('Import Data successfully');
    } catch (error) {
      console.log(error);
    }
    process.exit();
  })();
}

// Delete Data
if (process.argv[2].startsWith('--delete')) {
  (async () => {
    try {
      if (process.argv[2].split('--delete')[1] === '-room') {
        await Room.deleteMany();
      }
      if (process.argv[2].split('--delete')[1] === '-hotel') {
        await Hotel.deleteMany();
      }
      if (process.argv[2].split('--delete')[1] === '-transaction') {
        await Transaction.deleteMany();
      }
      console.log('Delete Data successfully');
    } catch (error) {
      console.log(error);
    }
    process.exit();
  })();
}
