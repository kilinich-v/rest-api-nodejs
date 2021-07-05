const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

const FILE_DIR = path.resolve(process.env.FILE_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  },
})

const uploadMiddleware = multer({ storage })

module.exports = { uploadMiddleware }
