import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    //TODO proveri podatke koriscenjem regexa 
    const data={
      username: username,
      password: password,
    }
    return this.http.post(`${this.uri}/users/login`, data);
  }

  checkPassword(password: String):boolean{
    let upper = false;     
    let lower = false;     
    let digits = false;
    let specialChar = false; 
    if(password.length<8 && password.length>12){
      return false;
    }
    for (let i = 0; i< password.length; i++) {
      let character = password.charAt(i); 
      if(/[a-z]/.test(character)){
        lower=true; 
      }
      else if(/[A-Z]/.test(character)){
        upper=true; 
      }
      else if(/[0-9]/.test(character)){
        digits=true; 
      }
      else if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(character)){
        specialChar=true; 
      }

    }
    if(upper && lower && digits && specialChar){
      return true; 
    }
    return false; 
    
  }

  checkEmail(email:String):boolean{
    let mail:string = email.valueOf();
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return true; 
    }
    return false; 
  }

  findUser(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/users/findUser`, data)

  }

}
