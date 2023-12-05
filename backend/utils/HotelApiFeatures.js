const ApiFeatures = require('./ApiFeatures');
const Room = require('../models/Room');

class HotelApiFeatures extends ApiFeatures {
  constructor(query, queryString) {
    super(query, queryString);
  }

  populateRooms() {
    const fields = ['title', 'price', 'maxPeople', 'desc', 'roomNumbers'];
    if (this.queryString.isPopulate) {
      this.query.populate({
        path: 'rooms',
        populate: {
          path: 'category',
          model: Room,
          select:
            this.queryString.isPopulate === '*'
              ? fields
              : this.queryString.isPopulate.split(','),
        },
      });
    }
    return this;
  }
}

module.exports = HotelApiFeatures;
