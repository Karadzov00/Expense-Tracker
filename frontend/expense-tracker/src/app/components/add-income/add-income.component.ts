import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Income } from 'src/app/models/income';
import { User } from 'src/app/models/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  id:number;
  date:Date;
  source:string;
  amount:number;
  currency:string;
  user: User;

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

  }

  selectPaymentType(type:string):void{
    this.source=type; 
  }

  addIncome():void{
    const newIncome: Income = {
      id: 0,
      username: this.user.username,
      date: this.date,
      source: this.source,
      amount: this.amount,
      currency: this.currency
    }

    console.log(newIncome);

    this.expenseService.addIncome(newIncome).subscribe(resp=>{
      alert(resp['message']);
    })
  }

}
