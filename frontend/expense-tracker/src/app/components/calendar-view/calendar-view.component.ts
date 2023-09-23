import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { CalendarOptions } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  user:User;
  allExpenses: Expense[]=[];
  allDates: Date[] = [];
  calendarOptions: CalendarOptions;
  calendar: Calendar;


  constructor(private currencyService: CurrencyService, private expenseService: ExpenseService, private router:Router) {

  }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

    // Subtract six months from the current date
    const currentDate: Date = new Date();
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
        this.allDates = this.allExpenses.map((expense) => new Date(expense.date));
        console.log(this.allDates);


        this.calendar = new Calendar(document.getElementById('calendar'), {
          plugins: [dayGridPlugin],
          events: this.formatExpensesToEvents(this.allExpenses), // Implement this method to provide events
        });
    
        this.calendar.render();
    
      });
  }

  formatExpensesToEvents(expenses: Expense[]) {
    return expenses.map(expense => ({
      title: expense.description, // Use expense description as the event title
      start: new Date(expense.date) // Convert expense date to a Date object
    }));
  }

}
