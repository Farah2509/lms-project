alert("JS CONNECTED");
const API = "http://localhost:5000/api/courses";

/* ---------- ADD COURSE ---------- */
async function addCourse() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const videoUrl = document.getElementById("videoUrl").value;

    if(!title || !description || !videoUrl){
        alert("Please fill all fields");
        return;
    }

    try {
        await fetch(`${API}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, videoUrl })
        });

        alert("Course Added Successfully ✅");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("videoUrl").value = "";

    } catch (err) {
        console.log(err);
    }
}

/* ---------- SHOW SECTIONS ---------- */
function showSection(sectionId){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.style.display = "none";
    });
    document.getElementById(sectionId).style.display="block";
}

/* ---------- LOAD COURSES ---------- */
async function loadCourses(){

    const list = document.getElementById("courseList");

    try{
        const res = await fetch(`${API}/all`);
        const courses = await res.json();

        list.innerHTML = "";

        courses.forEach(course=>{
            list.innerHTML += `
                <div style="border:1px solid #ccc;padding:15px;margin:10px;border-radius:8px;">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <a href="${course.videoUrl}" target="_blank">Watch Video</a>
                    <br><br>
                    <button onclick="deleteCourse('${course._id}')">Delete</button>
                </div>
            `;
        });

        document.getElementById("courseCount").innerText = courses.length;

    }catch(err){
        console.log(err);
    }
}

/* ---------- DELETE COURSE ---------- */
async function deleteCourse(id){
    await fetch(`${API}/delete/${id}`,{method:"DELETE"});
    loadCourses();
}

