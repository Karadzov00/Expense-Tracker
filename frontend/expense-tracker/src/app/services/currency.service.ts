import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json';

  constructor(private http: HttpClient) {}

  getExchangeRates(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
