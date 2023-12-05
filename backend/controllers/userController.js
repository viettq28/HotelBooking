const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create({ ...req.body, isAdmin: false });
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ isAdmin: false }).select('-__v -isAdmin');
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id, '-__v');
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getLoginToken = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const token = (await User.findOne({ username, password }))._id;
  res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.getUserStats = catchAsync(async (req, res) => {
  const numUsers = await User.aggregate([
    { $match: { isAdmin: { $ne: true } } },
    {
      $count: 'totalUsers',
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: numUsers[0],
  });
});
