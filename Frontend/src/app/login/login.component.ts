import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator,Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { Token } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted=false
  logindata: any;
  hide = true;

  constructor(private fb:FormBuilder,private _auth:AuthService,private router:Router) { }
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
  })

  ngOnInit(): void {
  }
  get AllControls(){
    return this.loginForm.controls
  }
  onSubmit(){
    this.submitted=true
    if(!this.loginForm.valid){
      Swal.fire('Oops', 'Fill in all the details!', 'error');
    }
    else{
     var logindata = this.loginForm.value;
     this._auth.loginUser(logindata)
.subscribe (data=>{
  console.log("data.message",data);
  if(data.message==="success"){
    console.log("userset in login.ts:",data.catogery)
    console.log("username in login.ts:",data.username)
            Swal.fire('Thank you '+data.username, 'Loged In succesfully!', 'success')
            localStorage.setItem('token',data.token);
            localStorage.setItem('currentUser',data.catogery);
            localStorage.setItem("user",data.catogery);
            localStorage.setItem("username",data.username);
    
    this.router.navigate(['/video'])     
 
   }
  }
   , ()=> {Swal.fire('Sorry...', 'something went wrong', 'error')}
)


       
}
}
}

  

  
