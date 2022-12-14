import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Issuemodel } from './isuue.model';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  displayVideoArray!:Array<any>
  videofile:Issuemodel[]|any;
  item=[{
    title:'',
    videoName:'',
    imageName:'',
    subTitle:'',
    rating:'',
   
  }]

  constructor(private _userservice:UserService) {
    this.displayVideoArray=[];
   }

  ngOnInit(): void {
    var reportid = localStorage.getItem('reportid')
    console.log("issuespage id",reportid);
    this._userservice.issuevideos().subscribe((res:any)=>{
      console.log("reported",res.videoName)
      // localStorage.setItem("reportedid",res._id)
      // this.displayVideoArray.push(res.videoName);
      this.videofile=res
    })
    

  }

}
