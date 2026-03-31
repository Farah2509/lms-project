const user = JSON.parse(localStorage.getItem("user"));

async function loadCourses() {

    try {
        const res = await fetch("/api/courses");
        const courses = await res.json();

        const container = document.getElementById("courselist");
        container.innerHTML = "";

        courses.forEach(course => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.videoUrl}" target="_blank">Watch</a>
                <br><br>
            `;

            // IMPORTANT PART ⭐⭐⭐
            const btn = document.createElement("button");
            btn.innerText = "Enroll";
            btn.onclick = () => enroll(course._id);

            div.appendChild(btn);
            div.appendChild(document.createElement("hr"));

            container.appendChild(div);
        });

    } catch (err) {
        document.getElementById("courselist").innerText = "Server not running";
    }
}

async function enroll(courseId) {

    if(!user){
        alert("Please login first");
        window.location.href = "/login.html";
        return;
    }

    const res = await fetch("/api/enroll", {
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



