import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-view-bills',
  templateUrl: './view-bills.component.html',
  styleUrls: ['./view-bills.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.3s ease-out'),
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ViewBillsComponent implements OnInit {

  user:User;
  allExpenses: Expense[]=[];
  filteredExpenses: Expense[]=[];
  expensesInPastSixMonths: Expense[]=[];
  selectedSortOrder: string = 'asc';
  selectedFilter: string = 'all'; // Default filter option
  showFiltered: boolean = false;

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


    // Method to sort expenses based on the selectedSortOrder
    sortExpenses() {
      this.showFiltered=false;
      if (this.selectedSortOrder === 'asc') {
        // Sort expenses in ascending order by date
        this.allExpenses.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else {
        // Sort expenses in descending order by date
        this.allExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }

    filterExpenses() {
      this.showFiltered=true;
      switch (this.selectedFilter) {
        case 'all':
          // Display all expenses
          this.filteredExpenses = [...this.allExpenses];
          break;
        case 'previous-month':
          // Display expenses from the previous month
          const currentDate = new Date();
          const previousMonth = new Date(currentDate);
          previousMonth.setMonth(currentDate.getMonth() - 1);
  
          this.filteredExpenses = this.allExpenses.filter(expense =>
            new Date(expense.date) >= previousMonth && new Date(expense.date) <= currentDate
          );
          break;
        case 'previous-6-months':
          // Display expenses from the previous 6 months
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
          this.filteredExpenses = this.allExpenses.filter(expense =>
            new Date(expense.date) >= sixMonthsAgo
          );
          break;
        default:
          break;
      }
    }

    viewExpense(expense: Expense):void{
      localStorage.setItem('selectedExpense', JSON.stringify(expense)); 
      this.router.navigate(['expenseDetails']);
    }

}
