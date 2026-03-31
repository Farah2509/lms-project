const container = document.getElementById("courseContainer");

async function loadCourses() {
    try {
        const res = await fetch("http://localhost:5000/api/courses/all");
        const courses = await res.json();

        container.innerHTML = "";

        if (courses.length === 0) {
            container.innerHTML = `<div class="empty">No courses available</div>`;
            return;
        }

        courses.forEach(course => {

            const card = document.createElement("div");
            card.className = "course-card";

            card.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a class="watch-btn"
                   href="course.html?video=${encodeURIComponent(course.videoUrl)}">
                   ▶ Watch Course
                </a>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        container.innerHTML = `<div class="empty">Server not running</div>`;
        console.error(err);
    }
}

loadCourses();

