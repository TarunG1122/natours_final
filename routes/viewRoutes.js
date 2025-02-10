const express = require('express');
const ViewsController = require('../controllers/viewsController')

const router = express.Router()
const authController = require('../controllers/authController')

const bookingcontroller = require('../controllers/bookingController')


// router.use()



router.get('/',bookingcontroller.createBookingCheckout,authController.isLoggedIn,ViewsController.getOverview);

router.get('/tour/:slug',authController.isLoggedIn,ViewsController.getTour)

router.get('/login',authController.isLoggedIn,ViewsController.getLoginForm)

router.get('/me',authController.protect,ViewsController.getAccount)

router.get('/my-tours',authController.protect,ViewsController.getMyTours)



router.post('/submit-user-data',authController.protect,ViewsController.updateUserData);

// router.get('/signup',ViewsController.getSignupForm)

module.exports = router



///////////////////////////////////////////////////////////////////////////////
