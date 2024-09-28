const express = require('express')
const Student = require('../models/Student.model')
const Teacher = require('../models/Teacher.model')
const Admin = require('../models/Admin.model') // Assuming you have these models
const router = express.Router()

router.post('/signin', async (req, res) => {
  const { eno, username, password, userType } = req.body

  let user
  console.log(eno + ' ' + username + ' ' + password + ' ' + userType)
  if (userType === 'student') {
    // Only check eno and password for students
    user = await Student.findOne({ eno, password })
  } else if (userType === 'teacher') {
    // Check username and password for teachers
    user = await Teacher.findOne({ username, password })
  } else if (userType === 'admin') {
    // Check username and password for admins
    user = await Admin.findOne({ username, password })
  }
  console.log(user)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

module.exports = router
