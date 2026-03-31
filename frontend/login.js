const BASE_URL = "http://localhost:5000/api";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e){

e.preventDefault();   // ⭐ यह refresh रोकता है

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const res = await fetch(`${BASE_URL}/auth/login`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data = await res.json();

if(!res.ok){
alert(data.message || "Invalid email or password");
return;
}

localStorage.setItem("user", JSON.stringify(data.user));

alert("Login successful");

window.location.href="/student/courses.html";

}catch(err){

console.log(err);
alert("Server error");

}

});