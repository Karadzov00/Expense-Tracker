import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  user:User;

  constructor(private router:Router, private userService:UserService) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
  }

}
