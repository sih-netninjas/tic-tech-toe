const express = require('express')
const Event = require('../models/Events.model') // Adjust the path as necessary
const router = express.Router()

// CREATE: Add a new event
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body
    const newEvent = new Event({ title, description })
    await newEvent.save()
    res.status(201).json(newEvent)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating event', error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
    res.status(200).json(events)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving events', error: error.message })
  }
})

// READ: Get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.status(200).json(event)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving event', error: error.message })
  }
})

// UPDATE: Update an event by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true } // Return the updated document
    )

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json(updatedEvent)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating event', error: error.message })
  }
})

// DELETE: Delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id)

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json({ message: 'Event deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting event', error: error.message })
  }
})

module.exports = router
