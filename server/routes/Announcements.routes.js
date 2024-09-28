const express = require("express");
const Announcement = require("../models/Announcements.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, branch, semester, className } = req.body;

    if (!title || !description || !branch || !semester || !className) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      branch,
      semester,
      className,
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating announcement", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().populate("branch");
    res.status(200).json(announcements);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving announcements",
        error: error.message,
      });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate(
      "branch"
    );
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving announcement", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, branch, semester, className } = req.body;

    if (!title || !description || !branch || !semester || !className) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, description, branch, semester, className },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating announcement", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      req.params.id
    );

    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting announcement", error: error.message });
  }
});

module.exports = router;
