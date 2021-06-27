const { ApiError } = require('./errors')

const asyncErrorsWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorsHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(500).json({ message: error.message })
}

module.exports = {
  asyncErrorsWrapper,
  errorsHandler,
}
