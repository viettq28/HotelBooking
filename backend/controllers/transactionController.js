const Transaction = require('../models/Transaction');
const ApiFeatures = require('../utils/ApiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.createTransaction = catchAsync(async (req, res) => {
  const newTransaction = await Transaction.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      transaction: newTransaction,
    },
  });
});

exports.getAllTransactions = catchAsync(async (req, res) => {
  if (!req.user.isAdmin) req.query.user = req.user.username;
  const features = new ApiFeatures(Transaction.find(), req.query)
    .filter()
    .sort()
    .limitResults();
  const transactions = await features.query
    .populate('hotel', 'name');
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

exports.getTransaction = catchAsync(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new AppError('No such transaction'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.updateTransaction = catchAsync(async (req, res) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!transaction) {
    return next(new AppError('No such transaction'), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.deleteTransaction = catchAsync(async (req, res) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    return next(new AppError('No such transaction'), 404);
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTransactionStats = catchAsync(async (req, res) => {
  const stats = await Transaction.aggregate([
    {
      $group: {
        _id: null,
        totalTransactions: { $count: {} },
        earn: { $sum: '$price' },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: stats[0],
  });
});

exports.getMonthlyBalance = catchAsync(async (req, res) => {
  const balance = await Transaction.aggregate([
    {
      $group: {
        _id: {$month: '$startDate'},
        earn: {$sum: '$price'}
      }
    },
    {
      $addFields: {
        month: '$_id'
      }
    },
    {
      $project: { _id: 0 }
    }
  ])
  res.status(200).json({
    status: 'success',
    data: balance
  })
})
