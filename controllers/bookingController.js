// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Tour = require('../models/tourModel');
// const catchAsync = require('../utils/catchAsync');
// const Booking = require('../models/bookingModel');
// const AppError = require('../utils/appError');
// const factory = require('./handlerFactory')

/////////////////////////////////// working code ////////////////////////////////////////

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   const tour = await Tour.findById(req.params.tourId);
//   console.log(tour);

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     // line_items: [
//     //   {
//     //     price_data: {
//     //       currency: 'usd',
//     //       product_data: {
//     //         name: `${tour.name} Tour`,
//     //         description: tour.summary
//     //       },
//     //       unit_amount: tour.price * 100
//     //     },
//     //     quantity: 1
//     //   }
//     // ],


//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: `${tour.name} Tour`,
//             description: tour.summary,
//             images: [`https://natours.dev/img/tours/${tour.imageCover}`] // Ensure 'tour.imageCover' contains the correct image filename
//           },
//           unit_amount: tour.price * 100 // Convert to cents
//         },
//         quantity: 1
//       }
//     ],
//     mode: 'payment',
//     success_url: `${req.protocol}://${req.get('host')}/`,
//     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId
//   });

//   console.log(session.url)

//   // 3) Create session as response
//   res.status(200).json({
//     status: 'success',
//     session
//   });
// });



///////////////////////////////////////////////////////////////////////////////////////////


// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   const tour = await Tour.findById(req.params.tourId);
//   console.log(tour);

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     // line_items: [
//     //   {
//     //     price_data: {
//     //       currency: 'usd',
//     //       product_data: {
//     //         name: `${tour.name} Tour`,
//     //         description: tour.summary
//     //       },
//     //       unit_amount: tour.price * 100
//     //     },
//     //     quantity: 1
//     //   }
//     // ],


//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: `${tour.name} Tour`,
//             description: tour.summary,
//             images: [`https://natours.dev/img/tours/${tour.imageCover}`] // Ensure 'tour.imageCover' contains the correct image filename
//           },
//           unit_amount: tour.price * 100 // Convert to cents
//         },
//         quantity: 1
//       }
//     ],
//     mode: 'payment',
//     success_url: `${req.protocol}://${req.get('host')}/`,
//     cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId
//   });

//   console.log(session.url)

//   // 3) Create session as response
//   res.status(200).json({
//     status: 'success',
//     session
//   });
// });


// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();
//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });




const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripe = require('stripe')('sk_test_51QpFq8CxmqBT54iGGu5XxgjlrZF0t765ZcWhUH7uUWkWCihyFHfCz1owF6NFefDtE7eQKp5CO6QyiGQECE4ABb6M00IEqEYQUu');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
        return next(new Error('Tour not found'));
    }

    console.log(tour);

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${tour.name} Tour`,
                        description: tour.summary,
                        images: [`https://natours.dev/img/tours/${tour.imageCover}`]
                    },
                    unit_amount: tour.price * 100
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId
    });

    console.log(session.url);

    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session
    });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    try {
        const { tour, user, price } = req.query;

        if (!tour || !user || !price) return next();

        await Booking.create({ tour, user, price });

        res.redirect(req.originalUrl.split('?')[0]);
    } catch (error) {
        console.error('Error creating booking:', error);
        next(error);
    }
});


exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.UpdateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);