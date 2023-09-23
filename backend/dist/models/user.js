"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = mongoose.model('User', userSchema, 'users');
//# sourceMappingURL=user.js.map