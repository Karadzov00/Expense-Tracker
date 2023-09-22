import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

  selectedCurrency: String= "EUR"; 
  currencyRates: any; 
  allCategories: Category[];
  user: User;
  allExpenses: Expense[];
  expensesInPastSixMonths: Expense[];
  sumsByMonth: { [key: string]: number } = {};


  constructor(private currencyService: CurrencyService, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.currencyService.getExchangeRates().subscribe((data: any) => {
      // Handle the currency exchange rate data here
      console.log(data);
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

        // this.calculateEUR();
        this.expenseSumsByMonth();
        console.log(this.sumsByMonth);
      })
    
  }


  convertAmount(expense: Expense):number{
    console.log(this.selectedCurrency);
    //convert to eur 
    //convert from eur to selected currency 
    var amount: number = expense.amount;
    var currency: string = expense.currency.toLowerCase();
    console.log("amount:" + amount);
    amount = amount/this.currencyRates["eur"][currency];
    console.log("amount in euros:" + amount);
    switch(this.selectedCurrency){
      case "EUR":
        return amount*this.currencyRates["eur"]["eur"];
      case "RSD":
        return amount*this.currencyRates["eur"]["rsd"];
      case "USD":
        return amount*this.currencyRates["eur"]["usd"];

    }
    return 0;
  }

  expenseSumsByMonth():void{
    this.sumsByMonth = {};

    for (let i = 6; i > 0; i--) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - i);
      const monthKey = `${currentDate.getFullYear()}-${monthNames[currentDate.getMonth()]}`;
      this.sumsByMonth[monthKey] = 0;
    }
    //sort expenses by date
    this.expensesInPastSixMonths.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    

    this.expensesInPastSixMonths.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const monthKey = `${expenseDate.getFullYear()}-${monthNames[expenseDate.getMonth()]}`;
      console.log(monthKey);
      if (!this.sumsByMonth[monthKey]) {
        this.sumsByMonth[monthKey] = 0;
      }
      var convertedAmount = this.convertAmount(expense);
      convertedAmount = parseFloat(convertedAmount.toFixed(2));
      console.log("converted amount: "+convertedAmount);
      this.sumsByMonth[monthKey] += convertedAmount;
    });
    console.log(this.sumsByMonth);
    // Convert the sums object into an array
    const sumsArray = Object.values(this.sumsByMonth);

    // Define the dataset
    this.lineChartData = [{ data: sumsArray, label: 'Total Expenses' }];

    // Get the list of months (labels)
    const months = Object.keys(this.sumsByMonth);

    // Define the labels for the chart
    this.lineChartLabels = months;


  }


}



