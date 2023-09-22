import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {

  user:User;
  selectedFile: File;
  imageChosen: boolean;
  image: any;

  paymentTypes: string[] = ["cash", "credit card", "debit card"];
  allCategories: Category[]=[]; 
  amount: number; 
  category: string;
  categoryID: number; 
  description: string; 
  receiptImg: string; 
  paymentType: string; 
  currency: string; 
  expense: Expense;
  expenseFields=[];


  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  date: Date;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.expense =JSON.parse(localStorage.getItem('selectedExpense')); 
    console.log(this.expense);

    this.expenseService.fetchAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
      console.log(this.allCategories);
    })

    this.expenseFields = [
      { label: 'Username', value: this.user.username },
      { label: 'Date', value: this.expense.date },
      { label: 'Category ID', value: this.expense.categoryId },
      { label: 'Amount', value: this.expense.amount },
      { label: 'Currency', value: this.expense.currency },
      { label: 'Description', value: this.expense.description },
      { label: 'Payment Method', value: this.expense.payment_method },
    ];
  }

}
