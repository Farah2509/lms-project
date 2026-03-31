const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form[0].value.trim();
    const email = form[1].value.trim();
    const password = form[2].value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Signup successful 🎉 Now login");

            // redirect to login page
            window.location.href = "login.html";
        } else {
            alert(data.message || "Signup failed");
        }

    } catch (err) {
        console.error(err);
        alert("Cannot connect to server");
    }
});