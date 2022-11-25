import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private _registerUrl ="http://localhost:3000/api/signup";
  private _loginUrl ="http://localhost:3000/api/login";

  constructor(private http:HttpClient) { }
  registerUser(user:any){
    console.log("authservice for signup")
    return this.http.post<any>(this._registerUrl,user)
  }
  loginUser(user:any){
    console.log("authservice for login")
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token');
   }

   getCurrentUser()
   {
     return localStorage.getItem('currentUser')
   }
}
