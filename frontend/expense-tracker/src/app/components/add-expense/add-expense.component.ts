import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddExpenseService } from 'src/app/services/add-expense.service';
import { Category } from 'src/app/models/category';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  user:User;
  selectedFile: File;
  imageChosen: boolean;
  image: any;

  paymentTypes: string[] = ["cash", "credit card", "debit card"];
  allCategories: Category[]=[]; 
  amount: number; 
  category: string;
  categoryID: number; 
  description: string; 
  receiptImg: string; 
  paymentType: string; 

  constructor(private router:Router, private userService:UserService,
    private addExpenseService: AddExpenseService) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

    this.addExpenseService.fetchAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
      console.log(this.allCategories);
    })
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = file; 
      this.imageChosen=true; 
      this.image=event.target.result; 
    });

    reader.readAsDataURL(file);
  }

}
