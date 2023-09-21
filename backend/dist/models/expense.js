"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
// Define the Expense schema
const expenseSchema = new mongoose.Schema({
    username: String,
    date: {
        type: Date, required: true
    },
    categoryId: {
        type: Number
    },
    amount: {
        type: Number
    },
    currencyID: String,
    description: String,
    payment_method: String,
    attachment: String, // Store the file path or URL of the receipt image
});
// Create and export the Expense model
exports.default = mongoose.model('Expense', expenseSchema, 'expenses');
//# sourceMappingURL=expense.js.map