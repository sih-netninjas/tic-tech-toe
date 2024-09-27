const mongoose = require('mongoose')

const SubjectSchema = mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
})

const Subject = mongoose.model('Subject', SubjectSchema)
