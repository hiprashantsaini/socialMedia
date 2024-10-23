// models/UserSubmission.js
const mongoose = require('mongoose');

// Define the schema for user submissions
const userSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      url:{type:String,required:true},
      filename:{type:String,required:true}
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a model from the schema
const UserSubmission = mongoose.model('UserSubmission', userSubmissionSchema);

module.exports = UserSubmission;
