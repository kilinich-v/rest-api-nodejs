const { Contact } = require('../db/contactShema')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()

    res.status(200).json({ contacts, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId

  try {
    const contact = await Contact.findById(contactId)

    if (!contact) {
      res.status(404).json({ message: 'Not found' })
    }

    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
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

  try {
    const contact = new Contact(newContact)
    await contact.save()

    res.status(201).json({ contact: newContact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId

  try {
    await Contact.findByIdAndRemove(contactId)

    res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const { name, email, phone } = req.body
  const contactId = req.params.contactId

  try {
    await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } })

    const updatedContact = await Contact.findById(contactId)
    res.status(200).json(updatedContact)
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' })
  }

  const { favorite } = req.body
  const contactId = req.params.contactId

  try {
    await Contact.findByIdAndUpdate(contactId, { $set: { favorite } })

    const updatedContact = await Contact.findById(contactId)
    res.status(200).json(updatedContact)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
