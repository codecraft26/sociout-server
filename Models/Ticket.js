const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true
  },
  theaterName: {
    type: mongoose.Schema.Types.ObjectId,ref:'TheatreName',
    required: true
  },
  
  showTime: {
    type: Date,
    default: Date.now,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
isBooked:{
        type:Boolean,
        default:false
},


        BookedBy:{
               type:mongoose.Schema.Types.ObjectId,
                ref:'User'
        },
        

        
});

module.exports = mongoose.model('Ticket', ticketSchema);
