document.getElementById("loginForm").addEventListener("submit", async function(e){

    e.preventDefault(); // Stop page reload

    const email = document.getElementById("email").value;
const password = document.getElementById("password").value;


    try {

        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await res.json();

       if(data.success){

    // Save user info
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userName", data.name);

    alert(data.message);

    // Go to dashboard
    window.location.href = "dashboard.html";

} else {

    alert(data.message);

}


    } catch (error) {
        alert("Server Error ❌");
        console.log(error);
    }

});
