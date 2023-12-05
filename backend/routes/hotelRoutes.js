const express = require('express');

const hotelController = require('../controllers/hotelController');

const router = express.Router();

router.route('/room-stats').post(hotelController.getHotelRoomStats);

router.route('/group-by/:category').get(hotelController.getHotelStatByGroup);

router
  .route('/top-rating')
  .get(hotelController.aliasTopRating, hotelController.getAllHotels);

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(hotelController.createHotel)
  .delete(hotelController.deleteMultipleHotels);

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(hotelController.updateHotel)
  .delete(hotelController.deleteHotel);

module.exports = router;