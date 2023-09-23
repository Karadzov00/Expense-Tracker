import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NO_USER_IMG } from 'src/app/models/no_user_img';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

  username: string; 
  password: string; 
  password2: string; 
  firstname:string; 
  lastname:string; 
  email:string; 
  image:string; 
  message: string; 
  imageChosen: boolean; 
  status: string; 
  userAdded:boolean; 
  successMessage:string;
  
  exitFunc:boolean;  
  showAlert=false; 
  userImage:string; 
  noUserImage:string; 

  selectedFile: File;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userAdded=false; 
    this.exitFunc=false;
    this.noUserImage = NO_USER_IMG;
  }

 register(){
    //provera da li su sva polja popunjena 
    this.showAlert=true; 
    if(!this.username || !this.password || !this.password2 || !this.firstname || !this.lastname || !this.email ){
        this.message="You must fill all forms!"; 
        this.userAdded=false;    
        return; 
      }

    if(this.password.localeCompare(this.password2)!=0){
      this.message="Password and its confirmation must be the same!"; 
      this.userAdded=false;    
      return; 
    }

    if(this.userService.checkPassword(this.password)==false){
      this.message="Password must consist of uppercase, lowercase, number and special character!"; 
      this.userAdded=false;    
      return; 
    }

    this.userService.findUser(this.username).subscribe((user:User)=>{
      if(user!=null){
        this.message="User with that username already exists!"; 
        this.userAdded=false; 
        this.exitFunc=true; 

        return; 
      }
    })

    if(!this.userAdded && this.exitFunc)return; 

 
    if(!this.selectedFile){
      this.userImage=this.noUserImage; 
    }
    else{
      console.log("dohvacen image preko forme"); 
      this.userImage=this.image; 
    }

    if(this.userImage){
      console.log("dohvacen image"); 
    }
    console.log(this.userImage); 

    this.userService.register(this.username, this.password, this.email, 
      this.firstname, this.lastname, this.userImage ).subscribe(
        respObj=>{
          if(respObj['message']=='ok'){
            this.successMessage='User added'; 
            this.userAdded=true;    
          }
          else{
            this.message='Error!'
          }
        }
      )
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
}
