const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeaturs');


exports.UpdateOne = Model =>catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No Document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});


exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});


exports.deleteOne = Model => catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError('No tour found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});


exports.getOne = (Model,popOptions) => catchAsync(async (req, res, next) => {
    
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }


    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

// exports.getAll = Model => {

//     catchAsync(async (req, res) => {
//         // 1A) Filtering
//         // const queryObj = { ...req.query };
//         // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//         // excludedFields.forEach(el => delete queryObj[el]);
    
//         // let queryStr = JSON.stringify(queryObj);
//         // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
//         // 2) Execute the query
//         const features = new APIFeatures(Model.find(), req.query)
//             .filter()
//             .sort()
//             .limitFields()
//             .paginate();
    
//         const doc = await features.query;
    
//         res.status(200).json({
//             status: 'success',
//             results: doc.length,
//             data: {
//                 data: doc
//             }
//         });
//     });

// }

exports.getAll = Model => catchAsync(async (req, res) => {
    // 1A) Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(el => delete queryObj[el]);
    
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);



    // allow for nested get nested all reviews

    let filter = {};
    if(req.params.tourId) filter = {tour:req.params.tourId};
    
    // 2) Execute the query
    const features = new APIFeatures(Model.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    
    const doc = await features.query;

    
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
});
