import { HttpClient, HttpParams } from '@angular/common/http';
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

  fetchExpensesByPeriod(username: string, date1: Date, date2: Date){

    const params = new HttpParams()
    .set('username', username)
    .set('date1', date1.toISOString()) // Convert Date to ISO string
    .set('date2', date2.toISOString()); // Convert Date to ISO string

    // Make the GET request with the query parameters
    return this.http.get(`${this.uri}/expenses/fetchExpensesByPeriod`, { params });

  }

  deleteExpense(id: number){
    return this.http.delete(`${this.uri}/expenses/deleteExpense/${id}`);
  }
}
