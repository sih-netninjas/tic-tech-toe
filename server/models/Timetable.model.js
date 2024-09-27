const mongoose = require('mongoose')

const TimeSlotSchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

const TimetableSchema = mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  semesterNumber: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  timeSlots: [TimeSlotSchema],
})

const Timetable = mongoose.model('Timetable', TimetableSchema)

module.exports = Timetable
