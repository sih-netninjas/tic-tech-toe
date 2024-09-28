const express = require('express')
const router = express.Router()
const Attendance = require('./path/to/your/AttendanceModel') // Update with the correct path

// CREATE: Add a new attendance record
router.post('/', async (req, res) => {
  try {
    const attendance = new Attendance(req.body)
    await attendance.save()
    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// READ: Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendances = await Attendance.find().populate(
      'branch students.student'
    )
    res.status(200).json(attendances)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// READ: Get an attendance record by ID
router.get('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      'branch students.student'
    )
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' })
    }
    res.status(200).json(attendance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// UPDATE: Update an attendance record by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' })
    }
    res.status(200).json(updatedAttendance)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE: Delete an attendance record by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id)
    if (!deletedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' })
    }
    res.status(204).send() // No content to send back
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
