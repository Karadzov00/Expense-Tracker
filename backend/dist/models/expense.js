"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
// Define the Expense schema
const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Expense', 'Income'],
    },
    amount: {
        type: Number,
        required: true,
    },
    description: String,
    payment_method: String,
    attachment: String, // Store the file path or a reference to the attachment
});
// Create and export the Expense model
exports.default = mongoose.model('Expense', expenseSchema, 'expenses');
//# sourceMappingURL=expense.js.map