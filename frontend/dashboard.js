// Get user from localStorage
const email = localStorage.getItem("userEmail");
const name = localStorage.getItem("userName");

// If not logged in, go back to login
if(!email){
    window.location.href = "login.html";
}

// Show welcome message
document.getElementById("welcomeText").innerText =
    "Welcome, " + name + " 👋";


// Go to profile
function goProfile(){
    window.location.href = "profile.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

