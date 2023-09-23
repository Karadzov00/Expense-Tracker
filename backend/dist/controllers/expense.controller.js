"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const category_1 = __importDefault(require("../models/category"));
const expense_1 = __importDefault(require("../models/expense"));
const income_1 = __importDefault(require("../models/income"));
class ExpenseController {
    constructor() {
        this.fetchAllCategories = async (req, res) => {
            try {
                const books = await category_1.default.find({});
                res.json(books);
            }
            catch (error) {
                console.log(error);
            }
        };
        this.addExpense = async (req, res) => {
            let newExpense = new expense_1.default({
                id: 0,
                username: req.body.expense.username,
                date: req.body.expense.date,
                categoryId: req.body.expense.categoryId,
                amount: req.body.expense.amount,
                currency: req.body.expense.currency,
                description: req.body.expense.description,
                payment_method: req.body.expense.payment_method,
                attachment: req.body.expense.attachment
            });
            try {
                const count = await expense_1.default.countDocuments({});
                newExpense.id = count + 1;
                const expense = await newExpense.save();
                res.json({ "message": "Expense added" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ "message": "error" });
            }
        };
        this.addIncome = async (req, res) => {
            let newIncome = new income_1.default({
                id: 0,
                username: req.body.income.username,
                date: req.body.income.date,
                source: req.body.income.source,
                amount: req.body.income.amount,
                currency: req.body.income.currency,
            });
            try {
                const count = await income_1.default.countDocuments({});
                newIncome.id = count + 1;
                const expense = await newIncome.save();
                res.json({ "message": "Income added" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ "message": "error" });
            }
        };
        this.fetchExpensesByPeriod = async (req, res) => {
            // Explicitly cast query parameters to strings
            const date1 = req.query.date1;
            const date2 = req.query.date2;
            const username = req.query.username;
            const date1AsDate = new Date(date1);
            const date2AsDate = new Date(date2);
            try {
                // Find expenses that match the criteria
                const expenses = await expense_1.default.find({
                    username: username,
                    date: { $gte: date1AsDate, $lte: date2AsDate }, // Date is between date1 and date2
                });
                res.json(expenses); // Return the expenses as JSON
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.fetchIncomesByPeriod = async (req, res) => {
            // Explicitly cast query parameters to strings
            const date1 = req.query.date1;
            const date2 = req.query.date2;
            const username = req.query.username;
            const date1AsDate = new Date(date1);
            const date2AsDate = new Date(date2);
            try {
                // Find expenses that match the criteria
                const expenses = await income_1.default.find({
                    username: username,
                    date: { $gte: date1AsDate, $lte: date2AsDate }, // Date is between date1 and date2
                });
                res.json(expenses); // Return the expenses as JSON
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.deleteExpense = async (req, res) => {
            const id = req.params.id;
            try {
                const deletedExpense = await expense_1.default.findOneAndDelete({ "id": id });
                res.json({ "message": "Expense with id " + id + " deleted" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.updateExpense = async (req, res) => {
            const expenseId = req.body.expense.id;
            const updatedExpense = {
                id: expenseId,
                username: req.body.expense.username,
                date: req.body.expense.date,
                categoryId: req.body.expense.categoryId,
                amount: req.body.expense.amount,
                currency: req.body.expense.currency,
                description: req.body.expense.description,
                payment_method: req.body.expense.payment_method,
                attachment: req.body.expense.attachment
            };
            try {
                const updated = await expense_1.default.findOneAndUpdate({ id: expenseId }, updatedExpense, { new: true });
                res.json({ "message": "Expense updated successfully!" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
    }
}
exports.ExpenseController = ExpenseController;
//# sourceMappingURL=expense.controller.js.map