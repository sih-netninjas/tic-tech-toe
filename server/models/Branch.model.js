const mongoose = require('mongoose')

// Semester Schema
const SemesterSchema = mongoose.Schema({
  sem: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
  ],
})

// Branch Schema
const BranchSchema = mongoose.Schema({
  branchName: {
    type: String,
    required: true,
    unique: true,
  },
  branchCode: {
    type: Number,
    required: true,
    unique: true,
  },
  semesters: [SemesterSchema],
})

// Create Branch model
const Branch = mongoose.model('Branch', BranchSchema)

module.exports = Branch
