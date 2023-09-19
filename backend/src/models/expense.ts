const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // References the Category model
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
export default mongoose.model('Expense', expenseSchema, 'expenses');


