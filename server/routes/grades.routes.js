const express = require('express')
const router = express.Router()
const StudentGrades = require('../models/StudentGrades') // Adjust the path as needed

// Create a new student grade record
router.post('/', async (req, res) => {
  try {
    const studentGrades = new StudentGrades(req.body)
    await studentGrades.save()
    res.status(201).json(studentGrades)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all student grade records
router.get('/', async (req, res) => {
  try {
    const studentGrades = await StudentGrades.find()
      .populate('studentId')
      .populate('semesters.subjects.subject')
    res.json(studentGrades)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a specific student grade record
router.get('/:id', getStudentGrades, (req, res) => {
  res.json(res.studentGrades)
})

// Update a student grade record
router.patch('/:id', getStudentGrades, async (req, res) => {
  if (req.body.studentId != null) {
    res.studentGrades.studentId = req.body.studentId
  }
  // Note: Updating semesters, subjects, or exams should be done through specific routes

  try {
    const updatedStudentGrades = await res.studentGrades.save()
    res.json(updatedStudentGrades)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a student grade record
router.delete('/:id', getStudentGrades, async (req, res) => {
  try {
    await res.studentGrades.remove()
    res.json({ message: 'Student grade record deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a semester to a student's grades
router.post('/:id/semesters', getStudentGrades, async (req, res) => {
  try {
    res.studentGrades.semesters.push(req.body)
    await res.studentGrades.save()
    res.status(201).json(res.studentGrades)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Add a subject to a semester
router.post(
  '/:id/semesters/:semesterId/subjects',
  getStudentGrades,
  async (req, res) => {
    try {
      const semester = res.studentGrades.semesters.id(req.params.semesterId)
      if (!semester)
        return res.status(404).json({ message: 'Semester not found' })

      semester.subjects.push(req.body)
      await res.studentGrades.save()
      res.status(201).json(res.studentGrades)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// Add an exam to a subject
router.post(
  '/:id/semesters/:semesterId/subjects/:subjectId/exams',
  getStudentGrades,
  async (req, res) => {
    try {
      const semester = res.studentGrades.semesters.id(req.params.semesterId)
      if (!semester)
        return res.status(404).json({ message: 'Semester not found' })

      const subject = semester.subjects.id(req.params.subjectId)
      if (!subject)
        return res.status(404).json({ message: 'Subject not found' })

      subject.exams.push(req.body)
      await res.studentGrades.save()
      res.status(201).json(res.studentGrades)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// Middleware function to get student grades by ID
async function getStudentGrades(req, res, next) {
  let studentGrades
  try {
    studentGrades = await StudentGrades.findById(req.params.id)
      .populate('studentId')
      .populate('semesters.subjects.subject')
    if (studentGrades == null) {
      return res
        .status(404)
        .json({ message: 'Cannot find student grade record' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.studentGrades = studentGrades
  next()
}

module.exports = router
