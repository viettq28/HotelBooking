const express = require('express');

const transactionController = require('../controllers/transactionController');

const router = express.Router();

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router.route('/stats').get(transactionController.getTransactionStats);

router.route('/monthly-balance').get(transactionController.getMonthlyBalance);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
