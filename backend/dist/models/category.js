"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
// Define the Category schema
const categorySchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true },
});
// Create and export the Category model
exports.default = mongoose.model('Category', categorySchema, 'categories');
//# sourceMappingURL=category.js.map