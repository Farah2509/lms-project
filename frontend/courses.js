import { useEffect } from "react";

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }
}, []);
const BASE_URL = "http://localhost:5000";

const courseList = document.getElementById("courselist");

async function loadCourses() {
    try {
        // const res = await fetch(`${BASE_URL}api/courses`);
        // const courses = await res.json();

const enrollRes = await fetch(`${BASE_URL}/enrollments/${user._id}`);
const enrolledCourses = await enrollRes.json();

enrolledIds = enrolledCourses.map(c => c._id);

        courseList.innerHTML = "";

        courses.forEach(course => {
            const div = document.createElement("div");
            div.className = "course-card";

            div.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.videoUrl}" target="_blank">Watch Video</a>
                <br><br>
                <button onclick="enrollCourse('${course._id}')">Enroll</button>
            `;

            courseList.appendChild(div);
        });

    } catch (err) {
        courseList.innerHTML = "<h3>Server not responding</h3>";
        console.log(err);
    }
}

async function enrollCourse(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    await fetch(`${BASE_URL}/enrollments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
studentId: user._id,
            courseId: courseId
        })
    });

    alert("Enrolled Successfully!");
}

loadCourses();
