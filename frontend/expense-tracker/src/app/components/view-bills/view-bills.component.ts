import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css']
})
export class ViewBillsComponent implements OnInit {

  user:User;
  allExpenses: Expense[]=[];
  expensesInPastSixMonths: Expense[]=[];
  constructor(private currencyService: CurrencyService, private expenseService: ExpenseService, private router:Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

    const currentDate = new Date();

    // Subtract six months from the current date
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    const date1 = new Date();
    date1.setFullYear(1900);
    date1.setMonth(0); // January (0-based index)
    date1.setDate(1);

    this.expenseService.fetchExpensesByPeriod(this.user.username, date1,
      currentDate).subscribe((expenses: Expense[])=>{
        console.log(expenses);
        this.allExpenses = expenses;

        this.expensesInPastSixMonths = expenses.filter((expense) => {
          // Convert the expense date to a Date object
          const expenseDate = new Date(expense.date);
          // Check if the expense date is within the past six months
          return expenseDate >= sixMonthsAgo && expenseDate <= currentDate;
        });
    });
  }

}
