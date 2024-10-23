// controllers/userSubmissionsController.js
const UserSubmission = require('../models/UserSubmission');
const path = require('path');
const fs = require('fs');
const bcrypt=require('bcryptjs')
const User=require('../models/UserModel');
const jwt=require('jsonwebtoken');

const signup=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
      return res.status(400).jsno({success:false,message:"Something is missing!"});
    }
   const user=await User.findOne({email:email})
   if(user){
    return res.status(400).json({success:false,message:"User already exists"});
   }

   const hashPassword=await bcrypt.hash(password,10);
   const newData=new User({
    name,
    email,
    password:hashPassword
   });

   await newData.save();

   res.status(201).json({success:true,message:"User created"});

  } catch (error) {
    console.log("signup :",error.message);
    res.status(500).json({success:false,message:"Internal server error"});
  }
}

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
      return res.status(400).send({ status: false, message: "Something is missing!" });
    }

    let user = await User.findOne({ email: email });
    if (!user) {
      //// 'status:false' means login is unsuccess and 'status:true' means login is success
      return res.status(200).send({ status: false, message: "Invalid email or password!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).send({ status: false, message: "Invalid email or password!" });
    }

   const userData={
    name:user?.name,
    email:user?.email,
    userId:user?._id
   }

    const token = jwt.sign({ userId: user._id }, 'my_secret_key', { expiresIn: '1d' })
    res.cookie('token', token, { httpOnly: true, sameSite: 'none',secure:true,maxAge: 1 * 24 * 60 * 60 * 1000 }).json({ status: true, message: "LoggedIn successfull",user:userData })

  } catch (error) {
    console.log("login:", error.message);
    res.status(500).send({ status: false, deviceOtp: false, message: "Internal server error..." });
  }
}

// Function to handle creating a user submission
const createUserSubmission = async (req, res) => {
  try {
    const { name, handle } = req.body;
    
    // Process uploaded images
    const images = req.files.map((file) => {
      data={
        url:file.path,
        filename:file.filename
      }
      return data;
    });

    // Create new submission in the database
    const newUserSubmission = new UserSubmission({
      name,
      socialMediaHandle:handle,
      images,
    });

    await newUserSubmission.save();


    return res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      submission: newUserSubmission,
    });
  } catch (error) {
    console.log("error :",error.message)
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating submission',
      error: error.message,
    });
  }
};

// Function to handle fetching all submissions for the admin dashboard
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await UserSubmission.find();
    return res.status(200).json({
      success: true,
      submissions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching submissions',
      error: error.message,
    });
  }
};



module.exports = {
  signup,
  loginUser,
  createUserSubmission,
  getAllSubmissions,
};
