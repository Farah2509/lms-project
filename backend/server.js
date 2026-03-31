const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


mongoose.connect("mongodb://127.0.0.1:27017/lms")
.then(()=>console.log("MongoDB connected"));

const courseRoutes = require("./routes/course");
const enrollmentRoutes = require("./routes/enrollment");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});