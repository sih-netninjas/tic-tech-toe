const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  },
})

const Teacher = new mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher
