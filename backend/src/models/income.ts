const mongoose = require('mongoose');

// Define the Income schema
const incomeSchema = new mongoose.Schema({
  id:Number,
  username: String, 
  date: {
    type: Date,
  },
  source: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currency: String
});

// Create and export the Income model
export default mongoose.model('Income', incomeSchema, 'incomes');


