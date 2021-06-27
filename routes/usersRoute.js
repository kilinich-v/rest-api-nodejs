const express = require('express')

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require('../controllers/userController')
const { asyncErrorsWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/registration', asyncErrorsWrapper(registrationController))
router.post('/login', asyncErrorsWrapper(loginController))
router.post('/logout', authMiddleware, asyncErrorsWrapper(logoutController))
router.post('/current', authMiddleware, asyncErrorsWrapper(currentUserController))

module.exports = router
