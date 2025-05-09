const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


exports.getAllReviews = factory.getAll(Review);

// exports.getAllReviews = catchAsync(async (req, res, next) => {



//     try {
//         let filter = {};
//         if(req.params.tourId) filter = {tour:req.params.tourId};
//         const reviews = await Review.find(filter);
//         res.status(200).json({
//             status: 'success',
//             results: reviews.length,
//             data: {
//                 reviews
//             }
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err.message
//         });
//     }
// });


exports.setTourUserIds = (req,res,next) =>{
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;

    next();

}


exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.UpdateOne(Review);

exports.deleteReview = factory.deleteOne(Review);