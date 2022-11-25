import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userlistUrl ="http://localhost:3000/api/userlist";
  private _trainerUrl ="http://localhost:3000/api/userlist/rolechangeadmin";
  private _userUrl ="http://localhost:3000/api/userlist/rolechangeuser";
  private _videoupload ="http://localhost:3000/uploadvideo";
  constructor(public http : HttpClient) { }
  getUsers(){
    return this.http.get<any>( this._userlistUrl);
  }
  maketoAdmin(body:any){
    return this.http.put<any>(this._trainerUrl,body)
  }
  maketoUser(body:any){
    return this.http.put<any>(this._userUrl,body)
  }

  videoUpload(body:any){
    // console.log("inside userservice file of uploadVideo",res)
    return this.http.post<any>(this._videoupload,body)
    
  
  }
}
