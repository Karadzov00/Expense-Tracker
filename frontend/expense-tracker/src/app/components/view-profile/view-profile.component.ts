import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Income } from 'src/app/models/income';
import { User } from 'src/app/models/user';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  user:User;
  allIncomes:Income[]=[];

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

    this.expenseService.fetchIncomesByPeriod(this.user.username, date1,
      currentDate).subscribe((incomes: Income[])=>{
        
        console.log("INCOMES");
        console.log("");
        console.log(incomes);
        this.allIncomes = incomes;
      });
  }

  deleteIncome(income:Income):void{
    this.expenseService.deleteIncome(income.id).subscribe((resp:String)=>{
      alert(resp['message']);
    })
  }

}
