const mongoose = require('mongoose')

const AttendanceSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
})

const Attendance = mongoose.model('Attendance', AttendanceSchema)
