const jimp = require('jimp')
const path = require('path')
const fs = require('fs')
const { registration, login, logout, currentUser, updateAvatar } = require('../services/usersService')

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

const uploadController = async (req, res) => {
  if (req.file) {
    const { _id } = req.user
    const { file } = req

    const img = await jimp.read(file.path)
    console.log(__dirname)
    await img
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(file.path)

    await fs.rename(file.path, path.join(process.env.AVATARS_DIR, file.filename), err => {
      if (err) throw err
    })

    const newAvatarURL = `${process.env.AVATARS_DIR}/${file.filename}`

    updateAvatar(_id, newAvatarURL)

    res.status(200).json({ status: 'success' })
  }
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  uploadController,
}
