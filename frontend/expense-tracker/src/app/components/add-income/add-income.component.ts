import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
  }

}
