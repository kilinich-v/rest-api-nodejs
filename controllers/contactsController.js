const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsService')

const listContactsController = async (req, res) => {
  const { _id } = req.user

  const contacts = await getContacts(_id)

  res.status(200).json({ contacts, status: 'success' })
}

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId

  const contact = await getContactById(contactId)

  if (!contact) {
    res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json(contact)
}

const addContactController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing required name field' })
  }

  const { name, email, phone } = req.body
  const { _id: userId } = req.user

  const newContact = {
    name,
    email,
    phone,
  }

  await addContact(newContact, userId)

  res.status(201).json({ contact: newContact, status: 'success' })
}

const removeContactController = async (req, res) => {
  const contactId = req.params.contactId

  await removeContact(contactId)

  res.status(200).json({ message: 'contact deleted' })
}

const updateContactController = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const { name, email, phone } = req.body

  const contactId = req.params.contactId

  const updatedContact = await updateContact(contactId, { name, email, phone })

  res.status(200).json(updatedContact)
}

const updateStatusContactController = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  const { favorite } = req.body
  const contactId = req.params.contactId

  const updatedContact = await updateStatusContact(contactId, favorite)

  res.status(200).json(updatedContact)
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
}
