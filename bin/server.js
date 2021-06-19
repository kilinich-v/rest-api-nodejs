require('dotenv').config()
const app = require('../app')
const { connectToMongo } = require('../db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectToMongo()

    app.listen(PORT, err => {
      if (err) console.error('Error server start:', err)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application: ${err.message}`)
  }
}

start()
