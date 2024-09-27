const express = require('express')
const router = express.Router()
const Student = require('../models/Student.model')

router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.status(201).json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('branch')
    res.json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', getStudent, (req, res) => {
  res.json(res.student)
})

router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name
  }
  if (req.body.eno != null) {
    res.student.eno = req.body.eno
  }
  if (req.body.sem != null) {
    res.student.sem = req.body.sem
  }
  if (req.body.contact != null) {
    res.student.contact = req.body.contact
  }
  if (req.body.email != null) {
    res.student.email = req.body.email
  }
  if (req.body.branch != null) {
    res.student.branch = req.body.branch
  }
  try {
    const updatedStudent = await res.student.save()
    res.json(updatedStudent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove()
    res.json({ message: 'Student deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function getStudent(req, res, next) {
  let student
  try {
    student = await Student.findById(req.params.id).populate('branch')
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.student = student
  next()
}

module.exports = router
/*

[
  {
    "name": "John Doe",
    "eno": 10001,
    "sem": 3,
    "contact": "1234567890",
    "email": "john.doe@example.com",
    "branch": "64a1b2c3d4e5f6a7b8c9d0e1"
  },
  {
    "name": "Jane Smith",
    "eno": 10002,
    "sem": 2,
    "contact": "2345678901",
    "email": "jane.smith@example.com",
    "branch": "64a1b2c3d4e5f6a7b8c9d0e2"
  },
  {
    "name": "Alice Johnson",
    "eno": 10003,
    "sem": 4,
    "contact": "3456789012",
    "email": "alice.johnson@example.com",
    "branch": "64a1b2c3d4e5f6a7b8c9d0e3"
  },
  {
    "name": "Bob Williams",
    "eno": 10004,
    "sem": 1,
    "contact": "4567890123",
    "email": "bob.williams@example.com",
    "branch": "64a1b2c3d4e5f6a7b8c9d0e4"
  },
  {
    "name": "Charlie Brown",
    "eno": 10005,
    "sem": 3,
    "contact": "5678901234",
    "email": "charlie.brown@example.com",
    "branch": "64a1b2c3d4e5f6a7b8c9d0e1"
  }
]

*/
