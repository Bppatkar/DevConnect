const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

export default errorHandler;
