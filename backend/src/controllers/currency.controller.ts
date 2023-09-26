const express = require('express');
const ExchangeRate = require('../models/exchangeRate');

export class ExchangeRateController {
  fetchAllExchangeRates = async (req, res) => {
    try {
      const exchangeRates = await ExchangeRate.find({});
      res.json(exchangeRates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  addExchangeRate = async (req, res) => {
    const { baseCurrency, targetCurrency, rate, date } = req.body;

    const newExchangeRate = new ExchangeRate({
      baseCurrency,
      targetCurrency,
      rate,
      date,
    });

    try {
      const exchangeRate = await newExchangeRate.save();
      res.json({ message: 'Exchange rate added', data: exchangeRate });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error adding exchange rate' });
    }
  }

  deleteExchangeRate = async (req, res) => {
    const id = req.params.id;
    try {
      const deletedExchangeRate = await ExchangeRate.findOneAndDelete({ _id: id });
      if (deletedExchangeRate) {
        res.json({ message: `Exchange rate with ID ${id} deleted` });
      } else {
        res.status(404).json({ message: 'Exchange rate not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

