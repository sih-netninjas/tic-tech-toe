const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  sem: {
    type: Number,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", SubjectSchema);
