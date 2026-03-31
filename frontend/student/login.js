const BASE_URL = "http://localhost:5000/api";
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful 🎉");

        window.location.href = "student/dashboard.html";

    } catch (err) {
        alert("Server not running");
    }
});
