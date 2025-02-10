// exports.getCheckoutSession = catchAsync(async (req, res, next) => {

//     // 1) Get the currently booked tour
//     const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
//     const tour = await Tour.findById(req.params.tourId);
//     console.log(tour);
//     console.log(req.user.email);
//     // 2) Create checkout session
//     const session = await stripe.checkout.sessions.create({

//         success_url: `${req.protocol}://${req.get('host')}/`,
//         cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
//     });

    
//     // 3) Create session as response
//     res.status(200).json({
//         status: 'success',
//         session
//     });

// });