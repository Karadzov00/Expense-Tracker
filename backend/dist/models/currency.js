"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const currencySchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});
exports.default = mongoose.model('Currency', currencySchema, 'currencies');
//# sourceMappingURL=currency.js.map