
const errorHandler = (err, req, res) => {
  res.status(500).json({
    message: err.message
  })
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else {
    next(err);
  }
}

module.exports = { errorHandler, boomErrorHandler };
