const express = require('express')
const router = express.Router()
const Subject = require('../models/Subject') // Adjust the path as needed

// Create a new subject
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body)
    await subject.save()
    res.status(201).json(subject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find()
    res.json(subjects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a specific subject
router.get('/:id', getSubject, (req, res) => {
  res.json(res.subject)
})

// Update a subject
router.patch('/:id', getSubject, async (req, res) => {
  if (req.body.sem != null) {
    res.subject.sem = req.body.sem
  }
  if (req.body.subjectName != null) {
    res.subject.subjectName = req.body.subjectName
  }
  if (req.body.subjectCode != null) {
    res.subject.subjectCode = req.body.subjectCode
  }
  try {
    const updatedSubject = await res.subject.save()
    res.json(updatedSubject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a subject
router.delete('/:id', getSubject, async (req, res) => {
  try {
    await res.subject.remove()
    res.json({ message: 'Subject deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Middleware function to get subject by ID
async function getSubject(req, res, next) {
  let subject
  try {
    subject = await Subject.findById(req.params.id)
    if (subject == null) {
      return res.status(404).json({ message: 'Cannot find subject' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.subject = subject
  next()
}

module.exports = router
