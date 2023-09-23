import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private currencyService: CurrencyService, private expenseService: ExpenseService, private router:Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
  }

}
