import express from 'express'
import { ExpenseController } from '../controllers/expense.controller';

const expenseRouter = express.Router(); 


expenseRouter.route('/fetchAllCategories').get(
    (req, res) => new ExpenseController().fetchAllCategories(req, res)
)

export default expenseRouter;