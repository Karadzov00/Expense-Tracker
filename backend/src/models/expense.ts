const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
  username: String, // Assuming 'username' is related to the user who incurred the expense
  date: {
     type: Date, required: true 
  },
  categoryId: {
     type: Number
  }, // Assuming a reference to a 'Category' model
  amount: {
    type: Number
  },
  description: String,
  payment_method: String,
  attachment: String, // Store the file path or URL of the receipt image
});

// Create and export the Expense model
export default mongoose.model('Expense', expenseSchema, 'expenses');

