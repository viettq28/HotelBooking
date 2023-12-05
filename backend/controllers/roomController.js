const Room = require('../models/Room');
const ApiFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.createRoom = catchAsync(async (req, res) => {
  const newRoom = await Room.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      room: newRoom,
    },
  });
});

exports.getAllRooms = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Room.find(), req.query)
    .filter()
    .sort()
    .limitResults();
  const rooms = await features.query;
  res.status(200).json({
    status: 'success',
    results: rooms.length,
    data: {
      rooms,
    },
  });
});

exports.getRoom = catchAsync(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    return next(new AppError('No such Room'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.updateRoom = catchAsync(async (req, res) => {
  const room = await Room.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!room) {
    return next(new AppError('No such Room'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.deleteRoom = catchAsync(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    return next(new AppError('No such Room'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.deleteMultipleRooms = catchAsync(async (req, res) => {
  await Room.deleteMany({_id: {$in: req.body}});
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
