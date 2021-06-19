const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../controllers/contactsController')
const { addContactValidation, updateStatusContactValidation } = require('../validation/contactsValidations.js')

const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', addContactValidation, addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', addContactValidation, updateContact)
router.patch('/:contactId', updateStatusContactValidation, updateStatusContact)

module.exports = router
