const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [false, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = {
  Contact,
}
