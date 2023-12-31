import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ReportComponent } from './components/report/report.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ViewBillsComponent } from './components/view-bills/view-bills.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  {path: 'addExpense', component: AddExpenseComponent},
  {path: 'report', component: ReportComponent},
  {path: 'expenseDetails', component: ExpenseDetailsComponent},
  {path: 'editExpense', component: EditExpenseComponent},
  {path: 'viewProfile', component: ViewProfileComponent},
  {path: 'viewBills', component: ViewBillsComponent},
  {path: 'addIncome', component: AddIncomeComponent},
  {path: 'calendarView', component: CalendarViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
