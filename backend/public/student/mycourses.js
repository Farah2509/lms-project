const BASE_URL = "http://localhost:5000/api";

async function loadMyCourses() {

    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        alert("Login again");
        window.location.href = "login.html";
        return;
    }

    const studentId = user._id;

    try{
        const res = await fetch(`${BASE_URL}/enrollments/${studentId}`);
        const courses = await res.json();

        const container = document.getElementById("myCoursesContainer") || document.getElementById("courseContainer");

        if(!courses || courses.length === 0){
            container.innerHTML = "<h3>No enrolled courses</h3>";
            return;
        }

        container.innerHTML = "";

courses.forEach(course => {

  container.innerHTML += `
    <div class="course-card">
      <h3>${course.title}</h3>
      <p>${course.description}</p>

      <button onclick="enroll('${course._id}')">
        Enroll
      </button>
    </div>
  `;
});
    

    }catch(err){
        console.log(err);
        const container = document.getElementById("myCoursesContainer") || document.getElementById("courseContainer");
        container.innerHTML = "<p>Error loading courses. Check console.</p>";
    }
}
async function enroll(courseId) {

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    alert("Login first");
    return;
  }

  try{
    const res = await fetch("http://localhost:5000/api/enrollments", {
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

    alert(data.message);

  }catch(err){
    console.log(err);
  }
}
window.enroll = async function(courseId) {

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    alert("Login first");
    return;
  }

  try{
    const res = await fetch("http://localhost:5000/api/enrollments", {
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

    alert(data.message);

  }catch(err){
    console.log(err);
  }
};

loadMyCourses();
