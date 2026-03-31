const BASE_URL = "http://localhost:5000/api";

// get container
const courseList = document.getElementById("courseList");

// get logged in user
const user = JSON.parse(localStorage.getItem("user"));

// protect page
if (!user) {
    alert("Please login first!");
    window.location.href = "../login.html";
}

// LOAD COURSES
async function loadCourses() {
    try {
        const res = await fetch(`${BASE_URL}/courses`);
        const courses = await res.json();

        // clear old content
        courseList.innerHTML = "";

        // no courses
        if (!courses || courses.length === 0) {
            courseList.innerHTML = "<p>No courses available</p>";
            return;
        }

        // show courses
        courses.forEach(course => {
            const div = document.createElement("div");

            div.style.border = "1px solid #000";
            div.style.padding = "15px";
            div.style.margin = "10px";
            div.style.borderRadius = "8px";
            div.style.background = "#fff";

            div.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="enrollCourse('${course._id}')">Enroll</button>
            `;

            courseList.appendChild(div);
        });

    } catch (err) {
        console.log(err);
        courseList.innerHTML = "<p>Server not running</p>";
    }
}


// ENROLL COURSE (GLOBAL FUNCTION)
window.enrollCourse = async function(courseId) {

    try {
        const res = await fetch(`${BASE_URL}/enrollments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentId: user._id,
                courseId: courseId
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Enrollment failed");
            return;
        }

        alert("Successfully Enrolled 🎉");

    } catch (err) {
        console.log(err);
        alert("Server error");
    }
}


// RUN
loadCourses();
