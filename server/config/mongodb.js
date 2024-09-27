const mongoose = require('mongoose')

const uri =
  'mongodb+srv://bazinga141206:f3XsREsfPvG4KsZa@cluster0.pi2sy.mongodb.net/tic-tech-toe?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('[mongodb] MongoDB Connected Successfully to tic-tech-toe')
  } catch (error) {
    console.error(`[mongodb] Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
