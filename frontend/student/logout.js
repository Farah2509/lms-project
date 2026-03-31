function logout() {
    localStorage.removeItem("studentId");
    alert("Logged out successfully");
    window.location.href = "login.html";
}