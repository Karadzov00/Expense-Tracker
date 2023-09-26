const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
  id:Number,
  username: String, 
  date: {
    type: Date,
    required: true 
  },
  categoryId: {
     type: Number
  }, 
  amount: {
    type: Number
  },
  currency: String, 
  description: String,
  payment_method: String,
  attachment: String, // Store the file path or URL of the receipt image
});

// Create and export the Expense model
export default mongoose.model('Expense', expenseSchema, 'expenses');

