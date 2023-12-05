const Hotel = require('../models/Hotel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const HotelApiFeatures = require('../utils/HotelApiFeatures');

exports.aliasTopRating = (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = '-rating';
  req.query.isPopulate = 'price';
  next();
};

exports.createHotel = catchAsync(async (req, res) => {
  const newHotel = await Hotel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      hotel: newHotel,
    },
  });
});

exports.getAllHotels = catchAsync(async (req, res) => {
  const features = new HotelApiFeatures(Hotel.find(), req.query)
    .filter()
    .sort()
    .limitResults()
    .populateRooms();
  const hotels = await features.query;
  res.status(200).json({
    status: 'success',
    results: hotels.length,
    data: {
      hotels,
    },
  });
});

exports.getHotel = catchAsync(async (req, res, next) => {
  const features = new HotelApiFeatures(
    Hotel.findById(req.params.id),
    req.query
  ).populateRooms();
  const hotel = await features.query;
  if (!hotel) {
    return next(new AppError('No hotel with that id'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      hotel,
    },
  });
});

exports.updateHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!hotel) {
    return next(new AppError('No hotel with that id'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      hotel,
    },
  });
});

exports.deleteHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) {
    return next(new AppError('No hotel with that id'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deleteMultipleHotels = catchAsync(async (req, res) => {
  await Hotel.deleteMany({ _id: {$in: req.body}});
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.getHotelStatByGroup = catchAsync(async (req, res) => {
  const category = req.params.category;
  const hotels = await Hotel.aggregate([
    {
      $group: {
        _id: `$${category}`,
        totalProperties: { $count: {} },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: hotels,
  });
});
// Get suitable hotels by Aggregation
exports.getHotelRoomStats = catchAsync(async (req, res) => {
  const { city, startDate, endDate, maxPeople, numRooms } = req.body;
  const sDate = new Date(startDate);
  const nDate = new Date(endDate);
  const availableHotels = await Hotel.aggregate([
    { $unwind: '$rooms' },
    {
      $lookup: {
        from: 'rooms',
        localField: 'rooms.category',
        foreignField: '_id',
        let: {
          number: { $arrayElemAt: ['$rooms.unavailable.number', 0] },
          startDate: { $arrayElemAt: ['$rooms.unavailable.startDate', 0] },
          endDate: { $arrayElemAt: ['$rooms.unavailable.endDate', 0] },
        },
        pipeline: [
          {
            $set: {
              roomNumbers: {
                $filter: {
                  input: '$roomNumbers',
                  as: 'num',
                  cond: {
                    $or: [
                      { $ne: ['$$num', '$$number'] },
                      {
                        $and: [
                          { $eq: ['$$num', '$$number'] },
                          {
                            $or: [
                              { $lt: [nDate, '$$startDate'] },
                              { $gt: [sDate, '$$endDate'] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
        as: 'populatedRooms',
      },
    },
    { $unwind: '$populatedRooms' },
    {
      $set: {
        'rooms.title': '$populatedRooms.title',
        'rooms.available': '$populatedRooms.roomNumbers',
        'rooms.desc': '$populatedRooms.desc',
        maxPeople: '$populatedRooms.maxPeople',
        totalAvailable: { $size: '$populatedRooms.roomNumbers' },
      },
    },
    {
      $group: {
        _id: '$_id',
        rooms: { $push: '$rooms' },
        name: { $first: '$name' },
        distance: { $first: '$distance' },
        name: { $first: '$name' },
        city: { $first: '$city' },
        rating: { $first: '$rating' },
        photos: { $first: '$photos' },
        totalRooms: { $sum: '$totalAvailable' },
        cheapestPrice: { $min: '$populatedRooms.price' },
        capacity: { $sum: { $multiply: ['$maxPeople', '$totalAvailable'] } },
      },
    },
    {
      $match: {
        city: city,
        totalRooms: { $gte: numRooms },
        capacity: { $gte: maxPeople },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    results: availableHotels.length,
    availableHotels,
  });
});
