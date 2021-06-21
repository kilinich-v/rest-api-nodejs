const { Contact } = require('../db/contactShema')

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find()

  res.status(200).json({ contacts, status: 'success' })
}

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId

  const contact = await Contact.findById(contactId)

  if (!contact) {
    res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json(contact)
}

const addContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing required name field' })
  }

  const { name, email, phone } = req.body

  const newContact = {
    name,
    email,
    phone,
  }

  const contact = new Contact(newContact)
  await contact.save()

  res.status(201).json({ contact: newContact, status: 'success' })
}

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId

  await Contact.findByIdAndRemove(contactId)

  res.status(200).json({ message: 'contact deleted' })
}

const updateContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const { name, email, phone } = req.body
  console.log(req.body)
  const contactId = req.params.contactId

  const updatedContact = await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } })

  res.status(200).json(updatedContact)
}

const updateStatusContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  const { favorite } = req.body
  const contactId = req.params.contactId

  const updatedContact = await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })

  res.status(200).json(updatedContact)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
