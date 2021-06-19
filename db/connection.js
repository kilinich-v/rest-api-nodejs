const mongoose = require('mongoose')

const connectToMongo = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('Database connection successful')
  })

  mongoose.connection.on('error', err => {
    console.log('Database connection error: ' + err)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database connection disconnected app termination')
      process.exit(1)
    })
  })
}

module.exports = {
  connectToMongo,
}
