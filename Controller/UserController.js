
const User =require("../Models/UserModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/JwtToken");






exports.createUser = catchAsyncErrors(async (req, res, next) => {


    const { name, email, password} = req.body;
  
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
  });

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
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

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);


  const {email ,name ,role} = user;
  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
   user: {email ,name ,role,createdAt:user.createdAt}
  });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
}
);

