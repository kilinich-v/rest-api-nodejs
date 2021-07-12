const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const { User } = require('../db/userShema')
const { Verification } = require('../db/verifivationShema')
const { NotAuthorizedError, RegistrationError, NotFoundError } = require('../helpers/errors')

const updateToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
}

const registration = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationError('Email in use')
  }

  const avatarURL = gravatar.url(email)
  const verifyToken = uuidv4()

  const user = new User({
    email,
    password,
    avatarURL,
    verifyToken,
  })
  await user.save()

  const verification = new Verification({
    verifyToken,
    userId: user._id,
  })
  await verification.save()

  const msg = {
    to: email,
    from: 'kylynych.v@gmail.com',
    subject: 'Thank you for registration!',
    text: `Please, confirm your email address POST http://localhost:8080/api/users/verify/${verifyToken}`,
    html: `Please, confirm your email address POST http://localhost:8080/api/users/verify/${verifyToken}`,
  }

  await sgMail.send(msg)

  return user
}

const registrationVerification = async verifyToken => {
  const verification = await Verification.findOneAndDelete({ verifyToken })

  if (!verification) {
    throw new NotFoundError('User not found')
  }

  const user = await User.findByIdAndUpdate(verification.userId, { verify: true })

  if (!user) {
    throw new NotAuthorizedError('No user found')
  }

  const msg = {
    to: user.email,
    from: 'kylynych.v@gmail.com',
    subject: 'Thank you for registration!',
    text: 'Thank you for registration!',
    html: '<h1>Thank you for registration!</h1>',
  }
  await sgMail.send(msg)
}

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong')
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET,
  )

  await updateToken(user._id, token)

  return { token, user }
}

const logout = async id => {
  await User.findOneAndUpdate(id, { $set: { token: null } })
}

const currentUser = async _id => {
  const user = await User.findOne({ _id })

  return user
}

const updateAvatar = async (_id, newURL) => {
  const user = await User.findOneAndUpdate(_id, { avatarURL: newURL })

  return user
}

module.exports = {
  registration,
  registrationVerification,
  login,
  logout,
  currentUser,
  updateAvatar,
}
