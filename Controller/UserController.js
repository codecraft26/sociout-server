
const User =require("../Models/UserModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JwtToken");

const ErrorHander=require('../utils/ErrorHander')
const EventEmitter = require('events');
const sendEmail = require('../utils/sendEmail');


exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password} = req.body;
// Creating a new event emitter instance
const eventEmitter = new EventEmitter();

// Event listener for user creation
eventEmitter.on('userCreated', async (user) => {
  try {
    // Sending email to the user
    await sendEmail({
      email: user.email,
      subject: 'Welcome to our platform!',
     template: './views/welcome.pug'
    });

// found error for this

    console.log('Email sent successfully! on '+{email});
  } catch (error) {
    console.error(error);
  }
});






    try{

    
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "aman",
        url:"niuorfb"
  
      },
     
    });
  
    sendToken(user, 201, res);
    eventEmitter.emit('userCreated', user);
    

  }
  catch(err){
    return next(
      res.status(500).json({
        success: false,
        message: err.message
      })
      
    )
  }

    // Emitting the event
    eventEmitter.emit('userCreated', user);
  });

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next("user not exists");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next("password not matched");
  }

  sendToken(user, 200, res);
 
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
}

);

// Get User Detail using jwt token 
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
    const {name,email,role}=user

    if(!user){
        return next(new ErrorHander("login first",404))
    }

  res.status(200).json({
    success: true,
    user:{name,email,role},
  });


});


exports.getUserByEmail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  res.status(200).json({
    success: true,
    user:{email:user.email,name:user.name,role:user.role}
  });
});


exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
}
);
//get all user
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
}
);



//create a conroller for sort the user by name
exports.sortUserByName = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find().sort({name:1});

  res.status(200).json({
    success: true,
    user,
  });
}
);
  
//search user y email
exports.searchUserByEmail = catchAsyncErrors(async (req, res, next) => {

const User=await User.find({email:{$regex:req.params.email,$options:'i'}})

  res.status(200).json({
    success: true,
    User,


})
}
);

//delete user by id
exports.deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
}
);

     




