const studentId = localStorage.getItem("studentId");

async function loadCourses() {

    const res = await fetch("http://localhost:5000/api/courses");
    const courses = await res.json();

    const container = document.getElementById("courseContainer");
    container.innerHTML = "";

    courses.forEach(course => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button onclick="enrollCourse('${course._id}')">Enroll</button>
            <hr>
        `;

        container.appendChild(div);
    });
}


// ENROLL FUNCTION
const BASE_URL = "http://localhost:5000/api";

async function addCourse(){

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const videoUrl = document.getElementById("videoUrl").value;
const imageUrl = document.getElementById("imageUrl").value;

const res = await fetch(`${BASE_URL}/courses`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
title,
description,
videoUrl,
imageUrl
})

});

const data = await res.json();

alert("Course added successfully");

}