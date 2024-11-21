const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: err.message || 'Internal Server Error',
    });
  };
  
  export default errorMiddleware;
  