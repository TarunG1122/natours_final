const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();


//// reviews should be sent to a url - nested route

// POST / tour/234fad4/reviews

// GET / tour/234fad4/reviews

// router.route('/:tourId/reviews').post(authController.protect,authController.restrictTo('user'),reviewController.createReview);

router.use('/:tourId/reviews',reviewRouter)


// router.param('id',tourController.checkID);

/// using alaising 

router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin','lead-guide','guide'),tourController.getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);
// tours-distance=233&center=40,50&unit=1
// tours-distance=233&center=40.5,50.5&unit=1

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router.route('/').get(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.getAllTours).post(tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(authController.protect, authController.restrictTo('admin','lead-guide'),tourController.uploadTourImages,tourController.resizeTourImages,tourController.updateTour).delete(authController.protect, authController.restrictTo('admin','lead-guide'),tourController.deleteTour);



module.exports = router;

//