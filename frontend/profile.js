// Get user data from localStorage
const name = localStorage.getItem("userName");
const email = localStorage.getItem("userEmail");

// If not logged in
if(!email){
    window.location.href = "login.html";
}

// Show data
document.getElementById("userName").innerText = name;
document.getElementById("userEmail").innerText = email;

// Back to dashboard
document.getElementById("backBtn").addEventListener("click", ()=>{
    window.location.href = "dashboard.html";
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", ()=>{

    localStorage.clear();

    window.location.href = "login.html";

});
