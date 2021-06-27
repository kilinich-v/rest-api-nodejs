const { Contact } = require('../db/contactShema')

const getContacts = async userId => {
  const contacts = await Contact.find({ userId }).select({
    __v: 0,
  })

  return contacts
}

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId)

  return contact
}

const addContact = async (newContact, userId) => {
  const contact = new Contact({ ...newContact, userId })
  await contact.save()
}

const removeContact = async contactId => {
  await Contact.findByIdAndRemove(contactId)
}

const updateContact = async (contactId, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } }, { new: true })
}

const updateStatusContact = async (contactId, favorite) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite } }, { new: true })
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
