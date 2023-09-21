import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

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
       })

  }

}
