import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Category } from 'src/app/models/category';
import { ExpenseService } from 'src/app/services/expense.service';


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
  category: string = 'Choose category';
  categoryID: number; 
  description: string; 
  receiptImg: string; 
  paymentType: string = 'Select payment type'; 
  currency: string; 

  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 

    this.expenseService.fetchAllCategories().subscribe((categories: Category[])=>{
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

  selectCategory(categoryItem: Category): void{
    this.category = categoryItem.name;
  }

  selectPaymentType(type:string):void{
    this.paymentType=type; 
  }

  addExpense():void{
    console.log(this.date);
    console.log(this.paymentType);
    console.log(this.amount);
    console.log(this.category);
    console.log(this.description);
    // console.log(this.image);
    
  }

}
