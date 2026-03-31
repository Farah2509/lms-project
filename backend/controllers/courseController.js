const Course = require("../models/Course");

// get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// add course (admin use later)
exports.addCourse = async (req, res) => {
    try {
        const { title, description, videoUrl } = req.body;

        const course = new Course({ title, description, videoUrl });
        await course.save();

        res.json({ message: "Course added" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
