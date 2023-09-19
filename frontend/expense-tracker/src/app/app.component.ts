import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-tracker';

  user: User;
  loggedIn: boolean;
  noUserImage: String; 

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void{

    const loggedUserJson = localStorage.getItem('loggedUser');
    if (loggedUserJson !== null) {
      this.user = JSON.parse(loggedUserJson);
      this.loggedIn = true; 
    } 

  }

  routerLogin(){
    this.router.navigate(['login']);
  }

  routerRegister(){
    this.router.navigate(['register']);
  }

  logout(){
    localStorage.clear(); 
    this.router.navigate(['homepage']).
    then(() => {
      window.location.reload();
    });
  }

  changePassword(){

    this.router.navigate(['changePassword']);
  }

}
