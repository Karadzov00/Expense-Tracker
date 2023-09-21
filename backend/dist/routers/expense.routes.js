"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const expenseRouter = express_1.default.Router();
expenseRouter.route('/fetchAllCategories').get((req, res) => new expense_controller_1.ExpenseController().fetchAllCategories(req, res));
expenseRouter.route('/fetchExpensesByPeriod').get((req, res) => new expense_controller_1.ExpenseController().fetchExpensesByPeriod(req, res));
expenseRouter.route('/addExpense').post((req, res) => new expense_controller_1.ExpenseController().addExpense(req, res));
expenseRouter.route('/updateExpense').put((req, res) => new expense_controller_1.ExpenseController().updateExpense(req, res));
expenseRouter.route('/deleteExpense/:id').delete((req, res) => { new expense_controller_1.ExpenseController().deleteExpense(req, res); });
exports.default = expenseRouter;
//# sourceMappingURL=expense.routes.js.map