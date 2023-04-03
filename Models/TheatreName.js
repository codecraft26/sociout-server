const mongoose = require("mongoose");

const theatreNameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },

  numberOfAuditoriums: {
    type: Number,
    required: true,
   
  },
  capicity: {
    type: Number,
    required: true,
  },
  
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  shows: [
    {
     type:String,
     required:true
    },
  ],
  


});

module.exports = mongoose.model("TheatreName", theatreNameSchema);
