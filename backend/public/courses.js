document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:5000/api";
const courseList = document.getElementById("courseContainer");
const searchInput = document.getElementById("searchCourse");

const user = JSON.parse(localStorage.getItem("user"));

let courses = [];
let enrolledIds = [];

// LOGIN CHECK
if(!user){
  alert("Please login first");
  window.location.href = "/login.html";
  return;
}

// LOAD COURSES
async function loadCourses(){
  try{
    const res = await fetch(`${BASE_URL}/courses`);
    courses = await res.json();

    console.log("Courses:", courses);

    // GET ENROLLED COURSES
    const enrollRes = await fetch(`${BASE_URL}/enrollments/${user._id}`);
    const data = await enrollRes.json();

    const enrolledCourses = Array.isArray(data) ? data : [];
    enrolledIds = enrolledCourses.map(c => c._id);

    displayCourses(courses, enrolledIds);

  }catch(err){
    console.log(err);
  }
}

// DISPLAY COURSES
function displayCourses(courseArray, enrolledCourses = []){

  courseList.innerHTML = "";

  courseArray.forEach(course => {

    // if(enrolledCourses.includes(course._id)) return;
    const isEnrolled = enrolledCourses.includes(course._id);
//   courseList.innerHTML += `
//   <div class="course-card">
//     <h3>${course.title}</h3>
//     <p>${course.description}</p>

//     <button 
//       onclick="window.enroll('${course._id}')"
//       ${isEnrolled ? "disabled" : ""}>
//       ${isEnrolled ? "Enrolled" : "Enroll"}
//     </button>
//   </div>
// `;
courseList.innerHTML += `
  <div class="course-card">
    <img src="${course.imageUrl}" 
         onerror="this.src='https://via.placeholder.com/300x180'"
         class="course-img"/>
    <h3>${course.title}</h3>
    <p>${course.description}</p>
    <button ${isEnrolled ? "disabled" : ""}>
      ${isEnrolled ? "Enrolled" : "Enroll"}
    </button>
  </div>
`;
  });
}

// ✅ GLOBAL ENROLL FUNCTION
window.enroll = async function(courseId){

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){
    alert("Login first");
    return;
  }

  try{
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
    alert(data.message);

    // reload courses after enroll
    loadCourses();

  }catch(err){
    console.log(err);
  }
};

// SEARCH
if(searchInput){
  searchInput.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(value)
    );

    displayCourses(filtered, enrolledIds);
  });
}

// START
loadCourses();

});