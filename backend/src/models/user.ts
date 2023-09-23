const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  firstname: String,
  lastname: String,
  profile_picture: String,
});

// Create and export the User model
export default  mongoose.model('User', userSchema, 'users');


