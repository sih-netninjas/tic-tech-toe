const express = require('express')
const Teacher = require('../models/Teacher.model')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body)
    await newTeacher.save()
    res.status(201).json(newTeacher)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('subjects branch')
    res.status(200).json(teachers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      'subjects branch'
    )
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json(teacher)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(200).json(updatedTeacher)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id)
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
