const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(userController.getLoginToken)
router.route('/register').post(userController.createUser);

router.route('/').get(userController.getAllUsers)

router.route('/stats').get(userController.getUserStats);

router.route('/:id').get(userController.getUser).post(userController.updateUser);


module.exports = router;