const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  id: Number, 
  name: { type: String, required: true },
});

// Create and export the Category model
export default mongoose.model('Category', categorySchema, 'categories');


