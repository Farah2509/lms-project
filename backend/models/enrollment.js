const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

courseId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Course"
},

progress: {
  type: Number,
  default: 0
}

});

module.exports = mongoose.model("Enrollment", enrollmentSchema);