const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Theatre = require("../Models/TheatreName");



exports.createTheatre = catchAsyncErrors(async (req, res, next) => {


try{
    const { name, location, numberOfAuditoriums,numberOfSeats,capicity,shows } = req.body;
    const theatre = await Theatre.create({
        name, location, numberOfAuditoriums,numberOfSeats, createdBy: req.user.id,capicity,shows
        
    });
    res.status(200).json({
        success: true,
        theatre,
    });
}
catch(err){
    res.status(400).json({
        success: false,
        message: err.message,
    });


}
}
);


exports.getTheatre = catchAsyncErrors(async (req, res, next) => {
   const id=req.params.id;
   try{
    const theatre = await Theatre.findById(id);
    res.status(200).json({
        success: true,
        theatre,
    });
}
catch(err){
    res.status(400).json({
        success: false,
        message: err.message,
    });
}
}
);





