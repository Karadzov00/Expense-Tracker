import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  selectedCurrency: String; 
  currencyRates: any; 
  allCategories: Category[];
  user: User;
  allExpenses: Expense[];
  expensesInPastSixMonths: Expense[];
  constructor(private currencyService: CurrencyService, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.currencyService.getExchangeRates().subscribe((data: any) => {
      // Handle the currency exchange rate data here
      // console.log(data);
      // console.log(data["eur"]["rsd"]);
      this.currencyRates = data;
      console.log(this.currencyRates["eur"]["rsd"]);
    });

    this.expenseService.fetchAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
      console.log(this.allCategories);
    })

    const currentDate = new Date();

// Subtract six months from the current date
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    const date1 = new Date();
    date1.setFullYear(1900);
    date1.setMonth(0); // January (0-based index)
    date1.setDate(1);

    this.expenseService.fetchExpensesByPeriod(this.user.username, sixMonthsAgo,
      currentDate).subscribe((expenses: Expense[])=>{
        console.log(expenses);
        this.allExpenses = expenses;

        this.expensesInPastSixMonths = expenses.filter((expense) => {
          // Convert the expense date to a Date object
          const expenseDate = new Date(expense.date);
          // Check if the expense date is within the past six months
          return expenseDate >= sixMonthsAgo && expenseDate <= currentDate;
        });
        
        console.log(this.allExpenses);
        console.log(this.expensesInPastSixMonths);
      })
    
  }


  calculateExpenses():void{
    console.log(this.selectedCurrency);
    switch(this.selectedCurrency){
      case "EUR":
        break;
      case "RSD":
        break;
      case "USD":
        break;
      default:
        console.log("Error!");
    }
  }

  calclateUSD(){

  }

  calculateRSD(){

  }

  calculateEUR(){

  }

}
