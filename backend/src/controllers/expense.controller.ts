import express from "express";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import category from "../models/category";
import Expense from "../models/expense";


export class ExpenseController{
    fetchAllCategories = async (req: express.Request, res: express.Response)=>{
        try {
            const books = await category.find({});
            res.json(books);
        } catch (error) {
            console.log(error); 
        }

    }

    addExpense = async (req: express.Request, res: express.Response)=>{
        let newExpense = new Expense({
            username: req.body.expense.username,
            date: req.body.expense.date,
            categoryId: req.body.expense.categoryId,
            amount: req.body.expense.amount,
            currency: req.body.expense.currency,
            description: req.body.expense.description,
            payment_method: req.body.expense.payment_method,
            attachment: req.body.expense.attachment
        })

        try {
            const expense = await newExpense.save();
            res.json({"message": "Expense added"})
        } catch (error) {
            console.log(error);
            res.status(400).json({"message": "error"})
        }
    }

    fetchExpensesByPeriod = async (req: express.Request, res: express.Response)=>{
        // Explicitly cast query parameters to strings
        const date1: string = req.query.date1 as string;
        const date2: string = req.query.date2 as string;
        const username: string = req.query.username as string;

        // Now you can use the date1 and date2 strings as needed
        // ...

        // For example, you can parse them into Date objects if needed
        const date1AsDate = new Date(date1);
        const date2AsDate = new Date(date2);

        try {
            // Find expenses that match the criteria
            const expenses = await Expense.find({
            username: username,
            date: { $gte: date1AsDate, $lte: date2AsDate }, // Date is between date1 and date2
            });

            res.json(expenses); // Return the expenses as JSON
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

}