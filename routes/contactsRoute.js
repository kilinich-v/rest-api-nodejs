const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../controllers/contactsController')
const { asyncErrorsWrapper } = require('../helpers/apiHelpers')
const { addContactValidation, updateStatusContactValidation } = require('../validation/contactsValidations.js')

const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', asyncErrorsWrapper(getContactById))
router.post('/', addContactValidation, asyncErrorsWrapper(addContact))
router.delete('/:contactId', asyncErrorsWrapper(removeContact))
router.put('/:contactId', addContactValidation, asyncErrorsWrapper(updateContact))
router.patch('/:contactId', updateStatusContactValidation, asyncErrorsWrapper(updateStatusContact))

module.exports = router
