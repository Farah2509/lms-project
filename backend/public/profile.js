const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
window.location.href="login.html";
}

// Fetch profile
fetch(`http://localhost:5000/api/auth/profile/${user._id}`)
.then(res => res.json())
.then(data => {

console.log(data); // check data in console

document.getElementById("name").value = data.name || "";
document.getElementById("bio").value = data.bio || "";

});

// Update profile
const form = document.getElementById("profileForm");

form.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const bio = document.getElementById("bio").value;

const res = await fetch(`http://localhost:5000/api/auth/update-profile/${user._id}`,{

method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:name,
bio:bio
})

});

const updatedUser = await res.json();

localStorage.setItem("user", JSON.stringify(updatedUser));

alert("Profile Updated");
});

if(user){
document.getElementById("avatarLetter").innerText =
user.name.charAt(0).toUpperCase();

document.getElementById("name").value = user.name;
document.getElementById("email").value = user.email;

// avatar letter
const letter = user.name.charAt(0).toUpperCase();

document.getElementById("avatarLetter").innerText = letter;
document.getElementById("navAvatar").innerText = letter;

}
const profilePicInput = document.getElementById("profilePic");

profilePicInput.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

localStorage.setItem("profilePic", e.target.result);

document.getElementById("avatarLetter").style.backgroundImage =
`url(${e.target.result})`;

document.getElementById("avatarLetter").style.backgroundSize = "cover";
document.getElementById("avatarLetter").innerText = "";

}

reader.readAsDataURL(file);

}

});
const savedPic = localStorage.getItem("profilePic");

if(savedPic){

const avatar = document.getElementById("avatarLetter");

avatar.style.backgroundImage = `url(${savedPic})`;
avatar.style.backgroundSize = "cover";
avatar.innerText = "";

}

