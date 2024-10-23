// routes/userSubmissions.js
const express = require('express');
const router = express.Router();
const { uploadImages, createUserSubmission, getAllSubmissions, signup, loginUser } = require('../controllers/userController');

const multer=require('multer')

const { storage } = require('../config/cloudinary');
const upload = multer({ storage }); // Initialize multer with Cloudinary storage

const {isLogin}=require('../authentication/auth');

// Route to create a user submission
router.post('/submit', upload.array('images', 10), createUserSubmission);

router.get('/profile',isLogin,(req,res)=>{
    try {
        const {name,email,_id}=req.user;
        res.status(200).json({success:true,user:{name,email,_id}});
    } catch (error) {
        res.status(400).json({success:false,message:"Please login again"})
    }
});


// Route to get all user submissions (for the admin dashboard)
router.get('/submissions', getAllSubmissions);

router.post('/signup',signup)
router.post('/login',loginUser)

router.get('/logout',async (req, res) => {
    try {
      res.cookie('token', '',{sameSite:'none',secure:true, maxAge: 0 }).send({ success: true, message: "Logged out" });
    } catch (error) {
      console.log("logout:", error.message);
      res.status(500).send({ status: false, message: "Internal server error..." });
    }
  })



module.exports = router;
