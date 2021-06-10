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

    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const contactId = Number(req.params.contactId)

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    const newContactsList = [
      ...parsedContactsList.filter(({ id }) => id !== contactId)
    ]

    fs.writeFile(
      contacts,
      JSON.stringify(newContactsList, null, '\t'),
      'utf8'
    )

    res.status(200).json({ status: `contact with id:'${contactId}' is deleted` })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body

  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone
  }

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    const newContactsList = [...parsedContactsList, newContact]

    fs.writeFile(
      contacts,
      JSON.stringify(newContactsList, null, '\t'),
      'utf8'
    )

    res.status(201).json({ contact: newContact, status: 'success' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  const contactId = Number(req.params.contactId)

  try {
    const contactsList = await fs.readFile(contacts)
    const parsedContactsList = JSON.parse(contactsList)

    parsedContactsList.forEach((contact) => {
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

    fs.writeFile(
      contacts,
      JSON.stringify(parsedContactsList, null, '\t'),
      'utf8'
    )

    res.status(201).json({ status: 'success' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
