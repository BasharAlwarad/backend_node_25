export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: isProduction ? 'Internal Server Error' : err.message,
    });
  } else {
    res.status(500).json({
      message: isProduction ? 'Internal Server Error' : 'Unknown Error!',
      ...(isProduction ? {} : { error: err.message, stack: err.stack }),
    });
  }
};
