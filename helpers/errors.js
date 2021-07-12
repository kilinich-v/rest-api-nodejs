class ApiError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends ApiError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends ApiError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends ApiError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class RegistrationError extends ApiError {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

module.exports = {
  ApiError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  RegistrationError,
  NotFoundError,
}
