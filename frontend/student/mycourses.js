const BASE_URL = "http://localhost:5000";

async function loadMyCourses() {

    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        alert("Login again");
        window.location.href="/login.html";
        return;
    }

    const studentId = user._id;

    try{
        const res = await fetch(`${BASE_URL}/api/enrollments/${studentId}`);
        const courses = await res.json();

        const container = document.getElementById("myCoursesContainer");

        if(courses.length === 0){
            container.innerHTML = "<h3>No enrolled courses</h3>";
            return;
        }

        container.innerHTML = "";

        courses.forEach(course=>{
            const div = document.createElement("div");

            div.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="${course.videoUrl}" target="_blank">Watch Course</a>
                <hr>
            `;

            container.appendChild(div);
        });

    }catch(err){
        console.log(err);
        alert("Error loading courses");
    }
}

loadMyCourses();
