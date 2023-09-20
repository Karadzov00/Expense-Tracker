import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'


  fetchAllCategories(){
    return this.http.get(`${this.uri}/expense/fetchAllCategories`); 

  }
}
