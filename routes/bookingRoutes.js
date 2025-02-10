const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);


router.use(authController.restrictTo('admin','lead-guide'));

router.route('/').get(bookingController.getAllBooking).post(bookingController.createBooking);


router.route('/:id').get(bookingController.getAllBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking)


// router.get('/checkout-session/:tourId', (req, res, next) => {
//     console.log('Route hit with tourId:', req.params.tourId);
//     next();
//   }, authController.protect, bookingController.getCheckoutSession);
  
module.exports = router;

