const asyncHandler = require("express-async-handler");
const User = require("../models/userModel"); // Update the import statement
const generateToken = require("../config/generateToken");


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, country, dob, gender, genderPreference, video, } = req.body;

  if (!name || !email || !password || !country || !dob || !gender || !genderPreference) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    country,
    dob,
    gender,
    genderPreference,
    video,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      country: user.country,
      dob: user.dob,
      gender: user.gender,
      genderPreference: user.genderPreference,
      video: user.video,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        dob: user.dob,
        country: user.country,
        gender: user.gender,
        genderPreference: user.genderPreference,
        video: user.video,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });


  const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    } : {};
  
    const { gender, ageRange, country } = req.query;
    if (gender) {
      keyword.gender = gender;
    }
    if (ageRange) {
      // Assuming age is stored in a field called "age" in your User model
      const [minAge, maxAge] = ageRange.split("-");
      keyword.age = { $gte: minAge, $lte: maxAge };
    }
    if (country) {
      keyword.country = country;
    }
  
    const users = await User.find({ _id: { $ne: req.user._id }, ...keyword });
    res.send(users);
  });

  const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        dob: user.dob,
        country: user.country,
        gender: user.gender,
        genderPreference: user.genderPreference,
        video: user.video,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
  
      if (req.body.pic) {
        user.pic = req.body.pic;
      }
  
      if (req.body.video) {
        user.video = req.body.video;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        pic: updatedUser.pic,
        dob: updatedUser.dob,
        country: updatedUser.country,
        gender: updatedUser.gender,
        genderPreference: updatedUser.genderPreference,
        video: updatedUser.video,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
  module.exports = { registerUser, authUser, allUsers, getUser, updateProfile };

  


  