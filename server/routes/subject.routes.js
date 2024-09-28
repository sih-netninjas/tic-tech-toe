const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject.model"); // Adjust the path as needed

// Create a new subject
router.post("/", async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific subject by subjectCode
router.get("/:subjectCode", async (req, res) => {
  try {
    const subject = await Subject.findOne({
      subjectCode: req.params.subjectCode,
    });

    if (!subject) {
      return res.status(404).json({ message: "Cannot find subject" });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:subjectCode", async (req, res) => {
  try {
    const updatedSubject = await Subject.findOneAndUpdate(
      { subjectCode: req.params.subjectCode },
      req.body,
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Cannot find subject" });
    }

    res.json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a subject by subjectCode
router.delete("/:subjectCode", async (req, res) => {
  try {
    const deletedSubject = await Subject.findOneAndDelete({
      subjectCode: req.params.subjectCode,
    });

    if (!deletedSubject) {
      return res
        .status(404)
        .json({ message: "Cannot find subject with this subjectCode" });
    }

    res.json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
