const express = require('express')

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model/index.js')
const { addContactValidation } = require('../../validation/contactsValidations.js')

const router = express.Router()

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', addContactValidation, addContact)
router.delete('/:contactId', removeContact)
router.patch('/:contactId', addContactValidation, updateContact)

module.exports = router
