const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const { User } = require('../db/userShema')
const { NotAuthorizedError, RegistrationError } = require('../helpers/errors')

const updateToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
}

const registration = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new RegistrationError('Email in use')
  }

  const avatarURL = gravatar.url(email)

  const user = new User({
    email,
    password,
    avatarURL,
  })
  await user.save()

  return user
}

const login = async (email, password) => {
  const user = await User.findOne({ email })

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
  login,
  logout,
  currentUser,
  updateAvatar,
}
