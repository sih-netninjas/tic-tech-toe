const express = require('express')
const router = express.Router()
const Branch = require('../models/Branch.model')

// Create a new branch
router.post('/', async (req, res) => {
  try {
    const branch = new Branch(req.body)
    await branch.save()
    res.status(201).json(branch)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get all branches
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find().populate({
      path: 'semesters.subjects',
      model: 'Subject',
    })
    res.json(branches)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a specific branch
router.get('/:id', getBranch, (req, res) => {
  res.json(res.branch)
})

// Update a branch
router.patch('/:id', getBranch, async (req, res) => {
  if (req.body.branchName != null) {
    res.branch.branchName = req.body.branchName
  }
  if (req.body.branchCode != null) {
    res.branch.branchCode = req.body.branchCode
  }
  try {
    const updatedBranch = await res.branch.save()
    res.json(updatedBranch)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a branch
router.delete('/:id', getBranch, async (req, res) => {
  try {
    await res.branch.remove()
    res.json({ message: 'Branch deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add a semester to a branch
router.post('/:id/semesters', getBranch, async (req, res) => {
  try {
    res.branch.semesters.push(req.body)
    await res.branch.save()
    res.status(201).json(res.branch)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a semester in a branch
router.patch(
  '/:branchId/semesters/:semesterId',
  getBranch,
  async (req, res) => {
    try {
      const semester = res.branch.semesters.id(req.params.semesterId)
      if (!semester)
        return res.status(404).json({ message: 'Semester not found' })

      if (req.body.sem != null) semester.sem = req.body.sem
      if (req.body.subjects != null) semester.subjects = req.body.subjects

      await res.branch.save()
      res.json(res.branch)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
)

// Remove a semester from a branch
router.delete(
  '/:branchId/semesters/:semesterId',
  getBranch,
  async (req, res) => {
    try {
      res.branch.semesters.id(req.params.semesterId).remove()
      await res.branch.save()
      res.json(res.branch)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Middleware function to get branch by ID
async function getBranch(req, res, next) {
  let branch
  try {
    branch = await Branch.findById(req.params.id).populate({
      path: 'semesters.subjects',
      model: 'Subject',
    })
    if (branch == null) {
      return res.status(404).json({ message: 'Cannot find branch' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.branch = branch
  next()
}

module.exports = router
