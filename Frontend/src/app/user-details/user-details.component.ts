import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
 users=[{
  username:'',
  role:''
 }] 
 user=[{
  username:'',
  role:''
 }]
  constructor(private _userService:UserService,private _router : Router) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe((data)=>{
      
     let p= localStorage.getItem('currentUser');
      console.log("catogery",p);
      if(p=="sadmin"){
      this.users = data;
     
    }
     })
  }
makeAdmin(user:any){
  var id = user._id
 this._userService.maketoAdmin({"id":id}).subscribe((res:any)=>{
  Swal.fire(
       'changed!',
        'user has been changed to admin.',
        'success'
  )
  this.users = this.users.filter((p: any) => p!==user)
 })
window.location.reload();
}
makeUser(user:any){
  var id = user._id
  this._userService.maketoUser({"id":id}).subscribe((res:any)=>{
   Swal.fire(
        'changed!',
         'admin has been changed to user.',
         'success'
   )
   this.users = this.users.filter((p: any) => p!==user)
  })
   window.location.reload();
 }

}

