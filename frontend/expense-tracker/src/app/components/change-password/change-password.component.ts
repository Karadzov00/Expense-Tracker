import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password:string;
  password2:string;
  password3:string;

  passwordChanged:boolean; 
  showAlert:boolean; 

  message:string; 

  user:User; 
  userAdded: boolean;
  exitFunc: boolean;

  
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.passwordChanged=false; 
    this.showAlert=false; 

    this.user= JSON.parse(localStorage.getItem('loggedUser')); 
  
  }

  changePassword(){
    if(!this.password || !this.password2 || !this.password3){
      this.message="All fields are required!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    if((this.password2.localeCompare(this.password3))){
      this.message="You didn't confirm your password right!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    if(this.user.password.localeCompare(this.password)){
      this.message="Old password is not correct!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    if(this.userService.checkPassword(this.password2)==false){
      this.message="New password is not in right format!"; 
      this.showAlert=true; 
      this.passwordChanged=false; 
      return;
    }

    this.userService.updatePassword(this.user.username, this.password2).subscribe(
      respObj=>{
        if(respObj['message']=='ok'){
          this.showAlert=true; 
          this.passwordChanged=true; 
          this.message='Password changed successfully'; 
        }
        else{
          this.showAlert=true; 
          this.passwordChanged=true; 
          this.message='Error!'
        }
      }
    )

  }

  routerLogin(){
    this.router.navigate(['']);
  }
  routerHome(){
    this.router.navigate(['reader']);
  }
  routerRegister(){
    this.router.navigate(['register']);
  }
  routerProfile(){
    this.router.navigate(['profile']); 
  }
}
