// const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const jwt = require('jsonwebtoken');
// const AppError = require('./../utils/appError');
// const { promisify } = require('util');
// const sendEmail = require('./../utils/email');
// const { compareSync } = require('bcrypt');
// const crypto = require('crypto');




// const signToken = id => {
//     return jwt.sign({id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRES_IN
//     });
// };

// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user._id);

//     const cookieOptions = {
//         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production' // Conditional secure cookie
//     };

//     res.cookie('jwt', token, cookieOptions);

//     // Remove password from the output
//     user.password = undefined;

//     res.status(statusCode).json({
//         status: 'success',
//         token,
//         data: { user }
//     });
// };


// exports.signup = catchAsync(async(req,res,next) => {
//     const newUser = await User.create({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//         passwordConfirm:req.body.passwordConfirm,
//         role: req.body.role,


//     });

//     //creating a token where the first argument is the payload and the second argument is the secret key and it is valid for 90 days

//     createSendToken(newUser,201,res);
// });

// // exports.login = catchAsync(async(req,res,next) => {
// //     const {email,password} = req.body;

// //     //1) Check if email and password exist
// //     if(!email || !password){
// //         return next(new AppError('Please provide email and password',400));
// //     }

// //     //2) Check if user exists and password is correct
// //     const user = await User.findOne({email}).select('+password');
// //     if(!user || !(await user.correctPassword(password,user.password))){
// //         return next(new AppError('Incorrect email or password',401));
// //     }


// //     //3) If everything is ok, send token to client

// //     createSendToken(user,200,res);

// // });

// /// login route 2
// exports.login = catchAsync(async (req, res, next) => {
//     const { email, password } = req.body;


//     // 1) Check if email and password exist
//     if (!email || !password) {
//         return next(new AppError('Please provide email and password!', 400));
//     }

//     // 2) Check if user exists && password is correct
//     const user = await User.findOne({ email }).select('+password');
//     console.log('User found:', user);

//     if (!user) {
//         console.log('User not found');
//         return next(new AppError('Incorrect email or password', 401));
//     }

//     const isPasswordCorrect = await user.correctPassword(password, user.password);
//     console.log('Password correct:', isPasswordCorrect);

//     if (!isPasswordCorrect) {
//         console.log('Incorrect email or password');
//         return next(new AppError('Incorrect email or password', 401));
//     }

//     // 3) If everything ok, send token to client
//     createSendToken(user, 200, res);
// });

// /////////////////////////////////////////////////////////////////////////////////////////////////\/\
// //////////////////////////////////////////////////////////////////////////////////


// /// protecting the auth routes

// // exports.protect = catchAsync(async (req, res, next) => {
// //     // 1) Get token and check if it's there
// //     let token;
// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //         token = req.headers.authorization.split(' ')[1];
// //     }

// //     if (!token) {
// //         return next(new AppError('You are not logged in! Please log in to get access.', 401));
// //     }

// //     // 2) Verification of token
// //     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// //     // 3) Check if user still exists
// //     const currentUser = await User.findById(decoded.id);
// //     if (!currentUser) {
// //         return next(new AppError('The user belonging to this token does no longer exist.', 401));
// //     }

// //     // 4) Check if user changed password after the token was issued
// //     if (currentUser.changedPasswordAfter(decoded.iat)) {
// //         return next(new AppError('User recently changed password! Please log in again.', 401));
// //     };

// //     // Grant access to protected route
    
// //     req.user = currentUser;
// //     next();
// // });

// ////// protecting the auth routes 2


// // exports.protect = catchAsync(async (req, res, next) => {
// //     // 1) Get token and check if it's there
// //     let token;
// //     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
// //         token = req.headers.authorization.split(' ')[1];
// //     }

// //     if (!token) {
// //         console.log('No token found');
// //         return next(new AppError('You are not logged in! Please log in to get access.', 401));
// //     }

// //     // 2) Verification of token
// //     let decoded;
// //     try {
// //         decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
// //         console.log('Token decoded:', decoded);
// //     } catch (err) {
// //         console.log('Token verification failed:', err);
// //         return next(new AppError('Invalid token. Please log in again.', 401));
// //     }

// //     // 3) Check if user still exists
// //     console.log('Decoded ID:', decoded.id);
// //     const currentUser = await User.findById(decoded.id);
// //     console.log('Current user:', currentUser);
// //     if (!currentUser) {
// //         console.log('User not found');
// //         return next(new AppError('The user belonging to this token does no longer exist.', 401));
// //     }

// //     // 4) Check if user changed password after the token was issued
// //     if (currentUser.changedPasswordAfter(decoded.iat)) {
// //         console.log('User recently changed password');

// //         return next(new AppError('User recently changed password! Please log in again.', 401));
// //     }

// //     // Grant access to protected route
// //     req.user = currentUser;
// //     console.log('Access granted to protected route');

// //     next();
// // });



// ///// protect 3

// exports.protect = catchAsync(async (req, res, next) => {
//     // 1) Get token and check if it's there
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }else if (req.cookies.jwt) {
//         token = req.cookies.jwt;
//     }

//     if (!token) {
//         console.log('No token found');
//         return next(new AppError('You are not logged in! Please log in to get access.', 401));
//     }

//     // 2) Verification of token
//     let decoded;
//     try {
//         decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//         console.log('Token decoded:', decoded);
//     } catch (err) {
//         console.log('Token verification failed:', err);
//         return next(new AppError('Invalid token. Please log in again.', 401));
//     }

//         // 3) Check if user still exists
//         console.log('Decoded ID:', decoded.id);
//         const currentUser = await User.findById(decoded.id);
//         console.log('Current user:', currentUser);
//         if (!currentUser) {
//             console.log('User not found');
//             return next(new AppError('The user belonging to this token does no longer exist.', 401));
//         }
    
//         // 4) Check if user changed password after the token was issued
//         if (currentUser.changedPasswordAfter(decoded.iat)) {
//             console.log('User recently changed password');
//             return next(new AppError('User recently changed password! Please log in again.', 401));
//         }
    
//         // Grant access to protected route
//         req.user = currentUser;
//         console.log('Access granted to protected route');
//         next();
//     });

// //////////////////////////////////////////////////////////////////////////////
// exports.restrictTo = (...roles)=>{
//     return (req, res, next) => {
//         console.log(roles);
//         console.log('Roles allowed:', roles);
//         console.log('User role:', req.user.role)
//         // 1) Get request role
//         // 2) Check if role is authorized
//         if (!roles.includes(req.user.role)) {
//             return next(new AppError('You do not have permission to perform this action', 403));
//             }
//             // Grant access to protected route
//             next();
//             }
      
// };



// // exports.forgotPassword = catchAsync( async(req,res,next) => {
// //     //1) get user based on POSTed data

// //     const user = await User.findOne({email:req.body.email});
// //     console.log(user);
// //     if(!user) {
// //         return next(new AppError('There is no user with that email address', 404));
// //     }

// //     //2)generate the random reset token

// //     const resetToken = user.createPasswordResetToken();
// //     await user.save({validateBeforeSave: false}); // save document without running hooks

// //     await user.save()
// // });


// exports.forgotPassword = catchAsync(async (req, res, next) => {
//     // 1) Get user based on POSTed email
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         return next(new AppError('There is no user with that email address.', 404));
//     }

//     // 2) Generate the random reset token
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

//     // 3) Send it to user's email
//     const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
//     const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: 'Your password reset token (valid for 10 min)',
//             message
//         });

//         res.status(200).json({
//             status: 'success',
//             message: 'Token sent to email!'
//         });
//     } catch (err) {
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save({ validateBeforeSave: false });

//         return next(new AppError('There was an error sending the email. Try again later!'), 500);
//     }
// });


// exports.resetPassword = catchAsync(async (req, res, next) => {
//     // 1) Get user based on the token
//     const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
//     console.log('Hashed token:', hashedToken);

//     const user = await User.findOne({
//         passwordResetToken: hashedToken,
//         passwordResetExpires: { $gt: Date.now() }
//     });

//     console.log('User found:', user);

//     // 2) If token has not expired and there is user, set the new password
//     if (!user) {
//         return next(new AppError('Token is invalid or has expired', 400));
//     }
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // 3) Update changedPasswordAt property for the user
//     // This is handled in the user model pre-save middleware

//     // 4) Log the user in, send JWT
//     createSendToken(user,200,res);
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//     // 1) Get user from collection
//     const user = await User.findById(req.user.id).select('+password');
//     console.log('User found:', user);
//     console.log('Request body:', req.body);

//     // 2) Check if POSTed current password is correct
//     if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//         return next(new AppError('Your current password is wrong.', 401));
//     }

//     // 3) If so, update password
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     await user.save();

//     // 4) Log user in, send JWT
//     const token = signToken(user._id);
//     res.status(200).json({
//         status: 'success',
//         token
//     });
// });


// //// only for rendered pages, no errors

// exports.isLoggedIn = async (req, res, next) => {
//     if (req.cookies.jwt) {
//         try {

//         // 1) verify token
//         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
  
//         // 2) Check if user still exists
//         const currentUser = await User.findById(decoded.id);
//         if (!currentUser) {
//           return next();
//         }
  
//         // 3) Check if user changed password after the token was issued
//         if (currentUser.changedPasswordAfter(decoded.iat)) {
//           return next();
//         }
  
//         // THERE IS A LOGGED IN USER
//         res.locals.user = currentUser;
//         return next();

//     }catch(err){
//         return next();
//     }
//       } 
    
//     next();
//   };



// exports.logout = (req, res) => {
// res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
    
// });
// res.status(200).json({ status: 'success' });
// console.log('Logged out');
// };










/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt
  })
  const url=`${req.protocol}://${req.get('host')}/me`
  console.log(url+" 1"); //this is logged
  await new Email(newUser,url).sendWelcome()
  console.log(url+" 2");  //this is not logged

  createSendToken(newUser, 201, res)

})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email


  // const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Your password reset token (valid for 10 min)',
    //   message
    // });

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});