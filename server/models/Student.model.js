const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  eno: {
    type: Number,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student
