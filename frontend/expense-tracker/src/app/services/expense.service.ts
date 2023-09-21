import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'


  fetchAllCategories(){
    return this.http.get(`${this.uri}/expenses/fetchAllCategories`); 

  }

  addExpense(expense: Expense){
    const data={
      expense:expense
    }
    return this.http.post(`${this.uri}/expenses/addExpense`, data); 

  }

  fetchExpensesByPeriod(username: String, date1: Date, date2: Date){
    const data={
      username: username,
      date1: date1, 
      date2: date2
    }
    return this.http.get(`${this.uri}/expenses/fetchExpensesByPeriod`); 

  }
}
