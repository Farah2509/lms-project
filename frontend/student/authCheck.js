const user = localStorage.getItem("user");

if (!user) {
    alert("Login First");
    window.location.href = "/student/login.html";
}