import express from 'express'
import { ExpenseController } from '../controllers/expense.controller';

const expenseRouter = express.Router(); 


expenseRouter.route('/fetchAllCategories').get(
    (req, res) => new ExpenseController().fetchAllCategories(req, res)
)

expenseRouter.route('/fetchExpensesByPeriod').get(
    (req, res) => new ExpenseController().fetchExpensesByPeriod(req, res)
)

expenseRouter.route('/addExpense').post(
    (req, res) => new ExpenseController().addExpense(req, res)
)

expenseRouter.route('/deleteExpense/:id').delete(
    (req, res) => {new ExpenseController().deleteExpense(req, res) }
)


export default expenseRouter;