"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseController = void 0;
const category_1 = __importDefault(require("../models/category"));
const expense_1 = __importDefault(require("../models/expense"));
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
                const expense = await newExpense.save();
                res.json({ "message": "Expense added" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ "message": "error" });
            }
        };
        this.fetchExpensesByPeriod = async (req, res) => {
            const { username, date1, date2 } = req.body;
            try {
                // Find expenses that match the criteria
                const expenses = await expense_1.default.find({
                    username: username,
                    date: { $gte: date1, $lte: date2 }, // Date is between date1 and date2
                });
                res.json(expenses); // Return the expenses as JSON
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