const BASE_URL = "http://localhost:5000/api";
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "/student/login.html";
}

document.getElementById("welcome").innerText = `Welcome ${user.name} 👋`;

async function loadDashboard() {

    try {
        const res = await fetch(`http://localhost:5000/api/enroll/${user._id}`);
        const courses = await res.json();

        document.getElementById("courseCount").innerText = courses.length;

    } catch (err) {
        console.log("Dashboard load error");
    }
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "/student/login.html";
}

loadDashboard();