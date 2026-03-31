async function loadCourses() {
    const res = await fetch("http://localhost:5000/api/courses");
    const courses = await res.json();

    const user = JSON.parse(localStorage.getItem("user"));

    const container = document.getElementById("courseList");
    container.innerHTML = "";

    courses.forEach(course => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <a href="${course.videoUrl}" target="_blank">Watch</a>
            <br><br>
            <button onclick="enroll('${course._id}')">Enroll</button>
            <hr>
        `;

        container.appendChild(div);
    });
}

async function enroll(courseId) {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userEmail: user.email,
            courseId: courseId
        })
    });

    const data = await res.json();
    alert(data.message);
}

loadCourses();

