import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser : any ='';
  constructor(public _authservice:AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this._authservice.getCurrentUser();
  }
  getloguser(){
    this.loggedUser = this._authservice.getCurrentUser(); 
    if(this.loggedUser=="sadmin"){
      return true;}
      else{
        return false;
      }
    }

}
