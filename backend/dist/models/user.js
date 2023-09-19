const mongoose = require('mongoose');
// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    profile_picture: String,
});
// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
export {};
//# sourceMappingURL=user.js.map