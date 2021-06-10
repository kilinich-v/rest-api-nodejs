const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index.js')

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.delete('/:contactId', removeContact)

router.post('/', addContact)

router.patch('/:contactId', updateContact)

module.exports = router
