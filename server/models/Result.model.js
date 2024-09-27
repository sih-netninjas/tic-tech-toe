const mongoose = require('mongoose')

// Exam Schema
const ExamSchema = mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
})

// Semester Schema
const SemesterSchema = mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
      },
      exams: [ExamSchema],
    },
  ],
})

// Student Grades Schema
const StudentGradesSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  semesters: [SemesterSchema],
})

// Create the model
const StudentGrades = mongoose.model('StudentGrade', StudentGradesSchema)

// Export the model
module.exports = StudentGrades
