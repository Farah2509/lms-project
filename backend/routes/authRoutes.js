const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
const User = require("../models/User");

router.get("/profile/:id", async (req,res)=>{
try{

const user = await User.findById(req.params.id);

res.json(user);

}catch(err){
res.status(500).json({message:"Error"});
}
});

router.put("/update-profile/:id", async (req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(user);

}catch(err){
res.status(500).json({message:"Error updating profile"});
}

});