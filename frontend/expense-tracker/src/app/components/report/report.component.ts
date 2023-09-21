import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

  }

}
