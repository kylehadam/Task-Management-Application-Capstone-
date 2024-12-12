const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorMiddleware;
