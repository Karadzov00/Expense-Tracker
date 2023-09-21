import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Expense } from 'src/app/models/expense';
import { User } from 'src/app/models/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {

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
  currency: string; 
  expense: Expense;
  expenseFields=[];


  constructor(private router:Router, private userService:UserService,
    private expenseService: ExpenseService) { }

  date: Date;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser')); 
    this.expense =JSON.parse(localStorage.getItem('selectedExpense')); 
    console.log(this.expense);

    this.expenseService.fetchAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
      console.log(this.allCategories);
    })

    this.expenseFields = [
      { label: 'Username', value: this.user.username },
      { label: 'Date', value: this.expense.date },
      { label: 'Category ID', value: this.expense.categoryId },
      { label: 'Amount', value: this.expense.amount },
      { label: 'Currency', value: this.expense.currency },
      { label: 'Description', value: this.expense.description },
      { label: 'Payment Method', value: this.expense.payment_method },
    ];
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

    // username: string;
    // date: Date;
    // categoryId: number;
    // amount: number;
    // currency: string;
    // description: string;
    // payment_method: string;
    // attachment: string;
    
    const foundCategory = this.allCategories.find(category => category.name === this.category);

    if (foundCategory) {
      this.categoryID = foundCategory.id;
    } 

    // this.naziv!=null?this.naziv:this.book.naziv; 

    const newExpense: Expense = {
      id: this.expense.id,
      username: this.user.username,
      date: this.date!=null ? this.date : this.expense.date,
      categoryId: this.categoryID != null ? this.categoryID : this.expense.categoryId,
      amount: this.amount != null ? this.amount : this.expense.amount,
      currency: this.currency != null ? this.currency : this.expense.currency,
      description: this.description != null ? this.description : this.expense.description,
      payment_method: this.paymentType != null ? this.paymentType : this.expense.payment_method,
      attachment: this.image != null ? this.image : this.expense.attachment
    }

    console.log(newExpense);

    this.expenseService.updateExpense(newExpense).subscribe(resp=>{
      alert(resp['message']);
    })

  }
}
