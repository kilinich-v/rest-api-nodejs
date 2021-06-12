const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')

const contacts = path.join(__dirname, './contacts.json')

const listContacts = async (req, res, next) => {
  try {
    const contactsList = await fs.readFile(contacts)

    res.status(200).json({ contacts: JSON.parse(contactsList), status: 'success' })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const contactId = Number(req.params.contactId)

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    const contact = parsedContactsList.find(({ id }) => id === contactId)

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
    id: shortid.generate(),
    name,
    email,
    phone,
  }

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    const newContactsList = [...parsedContactsList, newContact]

    fs.writeFile(contacts, JSON.stringify(newContactsList, null, '\t'), 'utf8')

    res.status(201).json({ contact: newContact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const contactId = Number(req.params.contactId)

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    if (!parsedContactsList.find(({ id }) => id === contactId)) {
      return res.status(404).json({ message: 'Not found' })
    }

    const newContactList = parsedContactsList.filter(({ id }) => id !== contactId)

    fs.writeFile(contacts, JSON.stringify(newContactList, null, '\t'), 'utf8')

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
  const contactId = Number(req.params.contactId)

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    if (!parsedContactsList.find(({ id }) => id === contactId)) {
      return res.status(404).json({ message: 'Not found' })
    }

    parsedContactsList.forEach(contact => {
      if (contact.id === contactId) {
        if (name) {
          contact.name = name
        }
        if (email) {
          contact.email = email
        }
        if (phone) {
          contact.phone = phone
        }
      }
    })

    fs.writeFile(contacts, JSON.stringify(parsedContactsList, null, '\t'), 'utf8')

    res.status(200).json({ contactId, name, email, phone })
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
}
