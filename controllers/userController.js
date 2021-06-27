const { registration, login, logout, currentUser } = require('../services/usersService')

const registrationController = async (req, res) => {
  const { email, password } = req.body

  const { subscription } = await registration(email, password)

  res.status(201).json({ user: { email, subscription } })
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  const {
    token,
    user: { subscription },
  } = await login(email, password)

  res.status(200).json({ token, user: { email, subscription } })
}

const logoutController = async (req, res) => {
  const { _id } = req.user

  await logout(_id)
  res.status(204).json()
}

const currentUserController = async (req, res) => {
  const { _id } = req.user

  const { email, subscription } = await currentUser(_id)

  res.status(200).json({ email, subscription })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
}
