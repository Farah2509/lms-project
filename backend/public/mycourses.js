const user = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", async () => {

const BASE_URL = "http://localhost:5000/api";
const courseContainer = document.getElementById("courseContainer");
const navAvatar = document.getElementById("navAvatar");

if(!user){
alert("Please login first");
window.location.href = "/login.html";
return;
}

try{

const res = await fetch(`${BASE_URL}/enrollments/${user._id}`);
const courses = await res.json();

console.log("Courses:", courses);

if(!courses || courses.length === 0){
courseContainer.innerHTML = "<p>No courses enrolled yet</p>";
return;
}

courseContainer.innerHTML = "";

// ✅ LOOP START
courses.forEach(course => {

    console.log("Course ID:", course._id); // 🔥 DEBUG

    // ❗ safety check
    if(!course || !course._id){
        console.log("Invalid course:", course);
        return;
    }

    const div = document.createElement("div");
    div.classList.add("course-card");

    div.innerHTML = `
    <img src="${course.imageUrl || ''}" class="course-img">
    <h3>${course.title || 'No title'}</h3>
    <p>${course.description || 'No description'}</p>
    <button onclick="continueCourse('${course._id}')">
    Continue Learning
    </button>
    `;

    courseContainer.appendChild(div);

});
// ✅ LOOP END

}catch(err){

console.log(err);
courseContainer.innerHTML = "<p>Error loading courses</p>";

}

// Avatar
const savedPic = localStorage.getItem("profilePic");

if(savedPic && navAvatar){
navAvatar.style.backgroundImage = `url(${savedPic})`;
}

});

// ✅ NAVIGATION FUNCTION
function continueCourse(courseId){

    if(!courseId){
        alert("Course ID missing ❌");
        return;
    }

    console.log("Redirecting with ID:", courseId);

    window.location.href = `courseplayer.html?id=${courseId}`;
}