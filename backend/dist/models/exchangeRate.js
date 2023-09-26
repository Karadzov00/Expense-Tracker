"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const exchangeRateSchema = new mongoose.Schema({
    baseCurrency: {
        type: String,
        required: true,
    },
    targetCurrency: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    date: Date,
});
const ExchangeRate = mongoose.model('ExchangeRate', exchangeRateSchema, 'exchange_rates');
//# sourceMappingURL=exchangeRate.js.map