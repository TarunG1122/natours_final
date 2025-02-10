const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');


exports.getOverview = catchAsync(async(req,res)=>{

    //1) get tour data from collection
    const tours = await Tour.find();



    //2) build template


    //3) render that template using tour from 1)
    res.status(200).render('overview',{
        title: 'All Tours',
        tours
        });
});


exports.getTour = catchAsync(async(req,res,next)=>{

    //1 get the data for the requested tour(including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })


    if(!tour){
        return next(new AppError('Tour not found with that name',404));
    }


    //2 build template


    //3 render template using data from 1


    res.status(200).render('tour',{
        title: `${tour.name} Tour`,
        tour
    })
})


// exports.getLoginForm = (req,res)=>{
//     res.status(200).render('login',{
//         title: 'Log into your account'
//     })
// }


exports.getLoginForm = catchAsync(async (req, res) => {
    res
      .status(200)
      .set(
        'Content-Security-Policy',
        "script-src 'self' https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js 'unsafe-inline' 'unsafe-eval';"
      )
      .render('login', {
        title: 'Login to your account',
      });
  });

exports.getSignupForm = (req,res)=>{
    res.status(200).render('signup',{
        title: 'Create your account'
    })
}

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
      title: 'Your account'
    });
  };


exports.updateUserData = catchAsync(async (req, res, next) => {
try {
    if (!req.body.name || !req.body.email) {
    return next(new AppError('Please provide both name and email', 400));
    }

    console.log('Updating user data for user ID:', req.user.id);

    const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
        name: req.body.name,
        email: req.body.email
    },
    {
        new: true,
        runValidators: true
    }
    );

    if (!updatedUser) {
    console.log('No user found with that ID');
    return next(new AppError('No user found with that ID', 404));
    }

    console.log('User data updated successfully:', updatedUser);

    res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
    });
} catch (err) {
    console.error('Error updating user data:', err);
    next(err);
}
});


exports.getMyTours = catchAsync(async(req,res,next) =>{
    
    //1) find all booking
    const bookings= await Booking.find({user:req.user.id})

    //2) find tours with the returned ID
    const tourIDs = bookings.map(el => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });
  
    res.status(200).render('overview', {
      title: 'My Tours',
      tours
    });

})