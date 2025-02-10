// const fs = require('fs')
// const express = require('express');
// const morgan = require('morgan');
// const toursRouter = require('./routes/tourRoutes');
// const usersRouter = require('./routes/userRoutes');
// const AppError = require('./utils/appError');
// const globalErrorHandler = require('./controllers/errorController');
// const rateLimit = require('express-rate-limit')
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize')
// const hpp = require('hpp')
// const cookieParser = require('cookie-parser')
// const reviewRouter = require('./routes/reviewRoutes');
// const path = require('path')
// const viewRouter = require('./routes/viewRoutes');
// const bookingRouter = require('./routes/bookingRoutes');
// const cors = require('cors'); // Enable Cross-Origin Requests




// const app = express();

// app.use(cors({
//   origin: 'http://127.0.0.1:3000', // Replace with your frontend URL
//   methods: 'GET,POST,PUT,DELETE', // Adjust the methods as needed
//   allowedHeaders: 'Content-Type, Authorization', // Adjust headers if needed
//   credentials: true, // If you're using cookies or authentication
// }));

// app.use((req, res, next) => {
//   res.setHeader(
//       'Content-Security-Policy',
//       "script-src 'self' https://unpkg.com/ https://tile.openstreetmap.org https://js.stripe.com"
//   );
//   next();
// });

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// // const cors = require('cors');
// // app.use(cors());


// // security http header

// app.use(helmet());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.originAgentCluster());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       'child-src': ['blob:'],
//       'connect-src': ['https://*.mapbox.com', 'https://*.cloudflare.com', 'http://127.0.0.1:3000'],
//       'default-src': ["'self'"],
//       'font-src': ["'self'", 'https://fonts.gstatic.com'],
//       'img-src': ["'self'", 'data:', 'blob:'],
//       'script-src': ["'self'", 'https://*.mapbox.com', 'https://*.cloudflare.com', 'http://127.0.0.1:3000'],
//       'style-src': ["'self'", "'unsafe-inline'", 'https:'],
//       'worker-src': ['blob:'],
//     },
//   })
// );

// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false
//   })
// );
 
// // app.use(helmet());
// // // app.use(helmet({ contentSecurityPolicy: false }));

// // 1) MIDDLEWARES
// app.use(morgan('dev'));

// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'));
// }


// /// set number of requestes per hour
// const limiter = rateLimit({
//     max:100,
//     windowMs:60*60*1000,
//     message:'Too many requests, please try again in an hour.',
// });

// app.use('/api',limiter)


// //// reading data from the body to req.body
// // app.use(morgan('dev'));
// app.use(express.json({limit:'10kb'}));
// app.use(express.urlencoded({extended:true, limit:'10kb'}));
// app.use(cookieParser());

// /// data sanitatzation against NOsql query
// app.use(mongoSanitize());


// /// data sanitization
// app.use(xss());


// //// prevent paramenter pollution
// app.use(hpp({
//     whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage','maxGroupSize','difficulty','price']

// }));


// // reading static file
// app.use(express.static(path.join(__dirname, 'public')));

// // app.use(express.static(path.join(__dirname,'public')));


// // app.use((req,res,next)=>{
// //     console.log('Hello from the middleware');
// //     next();
// // })


// app.use((req,res,next)=>{
//     req.requestTime = new Date().toISOString();
//     console.log(req.cookies);
//     next();
// })



// /////////////////////////////////////////////////////////////////////////////////////////////
// /// using leaflet

// const scriptSrcUrls = ['https://unpkg.com/',
//     'https://tile.openstreetmap.org'];
// const styleSrcUrls = [
//     'https://unpkg.com/',
//     'https://tile.openstreetmap.org',
//     'https://fonts.googleapis.com/'
// ];
// const connectSrcUrls = ['https://unpkg.com', 'https://tile.openstreetmap.org',"https://js.stripe.com/v3/"];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];
 
// //set security http headers
// app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         defaultSrc: [],
//         connectSrc: ["'self'", ...connectSrcUrls],
//         scriptSrc: ["'self'", ...scriptSrcUrls],
//         styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//         workerSrc: ["'self'", 'blob:'],
//         objectSrc: [],
//         imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
//         fontSrc: ["'self'", ...fontSrcUrls]
//       }
//     })
//   );






// ///////////////////////////////////////////////////////////////////////////////////////////////

//  // 2) ROUTE HANDLERS

//  //// TOURS

// ///// USERS


// // 3) ROUTES




// // Mounting the routers

// app.use('/',viewRouter)
// app.use('/api/v1/tours',toursRouter);
// app.use('/api/v1/users',usersRouter);
// app.use('/api/v1/reviews',reviewRouter);
// app.use('/api/v1/bookings',bookingRouter);

// ///// all the urls that are not present in the above routers will be redirected to this

// app.all('*',(req,res,next)=>{
//     // res.status(404).json({
//     //     status:'fail',
//     //     message:`Can't find ${req.originalUrl} on this server`
//     // })

//     // const err = new Error(`Can't find ${req.originalUrl} on this server`);
//     // err.statusCode = 404;
//     // err.status = 'fail';


//     next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
// });

// ///// handeling error in a middleware

// app.use(globalErrorHandler);

// // 4) START SERVER

// module.exports = app;


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const reviewRouter = require('./routes/reviewRoutes');
const path = require('path');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const cors = require('cors'); // Enable Cross-Origin Requests



const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://127.0.0.1:3000', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

// Set Content-Security-Policy (CSP) headers for allowed scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://unpkg.com https://tile.openstreetmap.org https://js.stripe.com"
  );
  next();
});

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Security HTTP Headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://unpkg.com",
        "https://tile.openstreetmap.org",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "https://cdn.jsdelivr.net" // ✅ Allow Axios & Mapbox
      ],
      connectSrc: [
        "'self'",
        "https://*.mapbox.com",
        "https://*.cloudflare.com",
        "http://127.0.0.1:3000",
        "https://js.stripe.com",
        "https://api.mapbox.com",
        "https://cdn.jsdelivr.net" // ✅ Allow Axios & Mapbox
      ],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      workerSrc: ["blob:"],
      frameSrc: ["'self'", "https://js.stripe.com"] // ✅ Allow Stripe iFrames
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting: Max 100 requests per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour.',
});
app.use('/api', limiter);

// Body parsing & cookie parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL Injection & XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution (allowing specific fields)
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to add request time to req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// Mounting routers
app.use('/', viewRouter);
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Handling undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app
module.exports = app;
