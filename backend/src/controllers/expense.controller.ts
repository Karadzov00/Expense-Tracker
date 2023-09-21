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

}