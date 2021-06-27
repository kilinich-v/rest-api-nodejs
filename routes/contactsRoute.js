const express = require('express')

const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require('../controllers/contactsController')
const { asyncErrorsWrapper } = require('../helpers/apiHelpers')
const { addContactValidation, updateStatusContactValidation } = require('../validation/contactsValidations.js')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', listContactsController)
router.get('/:contactId', asyncErrorsWrapper(getContactByIdController))
router.post('/', addContactValidation, asyncErrorsWrapper(addContactController))
router.delete('/:contactId', asyncErrorsWrapper(removeContactController))
router.put('/:contactId', addContactValidation, asyncErrorsWrapper(updateContactController))
router.patch('/:contactId', updateStatusContactValidation, asyncErrorsWrapper(updateStatusContactController))

module.exports = router
