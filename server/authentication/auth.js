const User=require('../models/UserModel');
const jwt=require('jsonwebtoken');
const isLogin = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);  // Log cookies

        const token = req.cookies['token'];  // Read token from cookies
        if (!token) {
            throw new Error('Token not found in cookies');
        }

        const payload = jwt.verify(token, 'my_secret_key');
        console.log("Payload:", payload);
        
        const userData = await User.findById(payload.userId);
        if (userData) {
            req.userId = userData._id;
            req.user = userData;
            next();
        } else {
            return res.status(401).json({ status: false, message: "Unauthorized error" });
        }
    } catch (error) {
        console.log("Authentication error:", error.message);
        return res.status(400).json({ status: false, message: "Authentication error" });
    }
};



module.exports={
    isLogin,
};