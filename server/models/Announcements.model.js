const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Announcement = mongoose.model('Announcement', AnnouncementSchema)

module.exports = Announcement
