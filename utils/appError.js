class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 4xx client error, 5xx server error
    this.isoperational = true; // operational errors are the errors that are created by the developers

    Error.captureStackTrace(this, this.constructor);


  }
};

module.exports = AppError;