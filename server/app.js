require('dotenv').config();
const express = require('express');
const connectDb=require('./db');
const cors=require('cors');

const CookieParser=require('cookie-parser');

const userRouter = require('./routes/userRoute');
const path = require('path');


const app = express();
app.use(express.json());
app.use(CookieParser());
app.use(express.urlencoded({extended:true}));

const corsOptions={
  origin: true,
  credentials:true
}
app.use(cors(corsOptions));
// Use the user submissions router
app.use('/api/user', userRouter);

const PORT=process.env.PORT || 8080
connectDb().then(()=>{
  console.log("Database is connected ")
  app.listen(PORT,()=>{
    console.log("Server is running");
  })
})
.catch((err)=>{
  console.error("Database cannot connect");
});
