import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { EventEmitter, Input, Output } from '@angular/core';

interface CurrencySums {
  [currency: string]: number; // Keys are currency codes, values are numbers
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  user: User;
  date1: Date;
  date2: Date;
  period: String; 
  expenses: Expense[]=[];
  allCategories: Category[];
  categoryNames: string[];
  expenseSum: number; 
  currencySums: CurrencySums = {};
  showTotal: boolean = false;
  selectedSortField: string = 'date'; // Default sort field
  selectedSortOrder: string = 'asc'; // Default sort order

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.expenseService.fetchAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
      console.log(this.allCategories);
      this.categoryNames = this.allCategories.map(category => category.name);
      console.log(this.categoryNames);
    })
  }

  getCategoryName(index: number):String{
    return this.categoryNames[index-1];
  }


  showReport():void{
    console.log(this.period);
    let currentDate;
    let currentYear;
    let currentMonth;
    switch(this.period){
      case "thisMonth":
        currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();

        // Calculate the first day of the current month (this.date1)
        this.date1 = new Date(currentYear, currentMonth, 1);

        // Set this.date2 as today's date
        this.date2 = new Date();
        break;
      case "dateRange":
        break;

      case "all":
        currentDate = new Date();
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();

        // Calculate the first day of the current month (this.date1)
        this.date1 = new Date(currentYear, currentMonth, 1);

        // Set this.date2 as today's date
        this.date2 = new Date();

        // Set this.date1 to a very old date
        this.date1.setFullYear(1900);
        this.date1.setMonth(0); // January (0-based index)
        this.date1.setDate(1);
        break; 
    }

    this.expenseService.fetchExpensesByPeriod(this.user.username, this.date1,
       this.date2).subscribe((expenses: Expense[])=>{
          console.log(expenses);
          this.expenses = expenses;
          this.expenses.forEach((expense) => {
            const { amount, currency } = expense;
            if (!this.currencySums[currency]) {
              this.currencySums[currency] = amount;
            } else {
              this.currencySums[currency] += amount;
            }
          });

          console.log(this.currencySums);
          this.showTotal = true;
       }) 

  }

  getCurrencies(currencySums: { [currency: string]: number }): string[] {
    return Object.keys(currencySums);
  }

  viewExpense(expense: Expense):void{
    localStorage.setItem('selectedExpense', JSON.stringify(expense)); 
    this.router.navigate(['expenseDetails']);
  }

  editExpense(expense: Expense):void{
    localStorage.setItem('selectedExpense', JSON.stringify(expense)); 
    this.router.navigate(['editExpense']);
  }
  deleteExpense(expense: Expense):void{
    this.expenseService.deleteExpense(expense.id).subscribe((resp:String)=>{
      alert(resp['message']);
    })
  }

 // Sort the 'expenses' array based on the selected field and order
 sortBy(field: string, order: string): void {
  this.expenses.sort((a, b) => {
    let comparison = 0;

    // Implement custom sorting logic based on the selected field
    switch (field) {
      case 'date':
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        comparison = date1.getTime() - date2.getTime();
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      case 'category':
        comparison = a.categoryId-b.categoryId;
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'currency':
        comparison = a.currency.localeCompare(b.currency);
        break;
      default:
        break;
    }

    // Apply the sorting order (ascending or descending)
    return order === 'asc' ? comparison : -comparison;
    });
  }

}
