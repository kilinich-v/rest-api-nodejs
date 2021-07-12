const express = require('express')

const {
  registrationController,
  registrationVerificationController,
  loginController,
  logoutController,
  currentUserController,
  uploadController,
} = require('../controllers/userController')
const { asyncErrorsWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { uploadMiddleware } = require('../middlewares/avatarsMiddleware')

const router = express.Router()

router.post('/registration', asyncErrorsWrapper(registrationController))
router.post('/login', asyncErrorsWrapper(loginController))
router.post('/logout', authMiddleware, asyncErrorsWrapper(logoutController))
router.post('/current', authMiddleware, asyncErrorsWrapper(currentUserController))
router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), asyncErrorsWrapper(uploadController))
router.get('/verify/:verificationToken', asyncErrorsWrapper(registrationVerificationController))

module.exports = router
