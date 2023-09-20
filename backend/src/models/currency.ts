const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  }
});

export default mongoose.model('Currency', currencySchema, 'currencies');


