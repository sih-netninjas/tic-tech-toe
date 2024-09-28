const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/mongodb')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

connectDB()

app.use('/subjects', require('./routes/subject.routes'))
app.use('/branches', require('./routes/branch.routes'))
app.use('/auth/', require('./routes/auth.routes'))
app.use('/events', require('./routes/event.routes'))
app.use('/announcements', require('./routes/Announcements.routes'))

app.get('/', (req, res) => {
  res.send('Hello')
})                                                                                                                                                                                                            

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost${PORT}`)
})
