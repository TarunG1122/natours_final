const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();


process.on('uncaughtException',err=>{
    console.log(err.name,err.message);
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    process.exit(1);
});

dotenv.config({path:'./config.env'});
const app = require('./app');

// app.use(morgan('dev'));

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);


mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>{
  
    console.log('DB connection successful');
});

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
  } else {
    console.log('Running in development mode');
  }
  


// console.log(process.env);

const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log('UNHANDLED REJECTION! Shutting down...');
    server.close(()=>{
        process.exit(1);
    })
});



