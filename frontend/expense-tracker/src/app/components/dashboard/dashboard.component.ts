import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  selectedCurrency: String; 

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((data: any) => {
      // Handle the currency exchange rate data here
      console.log(data);
      console.log(data["eur"]["rsd"]);
    });
  }


  calculateExpenses():void{
    console.log(this.selectedCurrency);
  }

}
