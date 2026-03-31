const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Enrollment = require("../models/enrollment");
const Course = require("../models/Course");

// ✅ ENROLL COURSE
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { studentId, courseId } = req.body;

    console.log("Saving:", studentId, courseId)
    const enrollment = new Enrollment({
      studentId,
      courseId
    });

    await enrollment.save();

    res.json({ message: "Course enrolled successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET MY COURSES
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.params.studentId);

    const enrollments = await Enrollment
      .find({ studentId })
      .populate("courseId");

    const courses = enrollments.map(e => e.courseId);

    res.json(courses);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET ALL ENROLLMENTS
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE PROGRESS
router.put("/progress", async (req, res) => {
  try {
    const { studentId, courseId, progress } = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { studentId, courseId },
      { progress },
      { new: true }
    );

    res.json({ message: "Progress updated", enrollment });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;