const BASE_URL = "http://localhost:5000";

async function loadMyCourses() {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            window.location.href = "login.html";
            return;
        }

const studentId = user._id;

        // fetch enrolled courses
        const res = await fetch(`${BASE_URL}/api/enrollments/${studentId}`);
        const data = await res.json();

        const container = document.getElementById("myCourseList");
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<p>You have not enrolled in any course.</p>";
            return;
        }

        data.forEach(enroll => {
            const course = enroll.courseId;

            const card = document.createElement("div");
            card.className = "course-card";

            card.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.videoUrl}" target="_blank">
                    <button>Watch Course</button>
                </a>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        document.getElementById("myCourseList").innerHTML =
            "<p>Server not responding</p>";
    }
}

loadMyCourses();


