const mongoose = require('mongoose')

const verificationSchema = new mongoose.Schema({
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Verification = mongoose.model('Verification', verificationSchema)

module.exports = {
  Verification,
}
