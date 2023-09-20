import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string; 
  password: string; 
  errorMessage: string; 

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }


  login():void{
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user){
        console.log("user");

        localStorage.setItem('loggedUser', JSON.stringify(user)); 
        this.router.navigate(['dashboard']).
        then(() => {
            window.location.reload();
        });
      }
      else{
        console.log("wrong message");
        this.errorMessage = 'Wrong username or password!';
      }
    })
  }

  routerLogin():void{
    this.router.navigate(['login']);
  }
  routerHome():void{
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  routerRegister():void{
    this.router.navigate(['register']);
  }

  routerChangePassword():void{
    this.router.navigate(['changePassword']);
  }
}
