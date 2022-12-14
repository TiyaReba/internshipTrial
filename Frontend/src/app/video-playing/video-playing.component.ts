import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Videomodel } from './video.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-video-playing',
  templateUrl: './video-playing.component.html',
  styleUrls: ['./video-playing.component.css']
})
export class VideoPlayingComponent implements OnInit {
  displayVideoArray!:Array<any>
  currentrating: string | undefined;

  constructor(private _userservice:UserService) {
    this.displayVideoArray=[];
   }
  videofile :Videomodel[]|any;
  item=[{
    title:'',
    videoName:'',
    imageName:'',
    subTitle:'',
    rating:'',
   
  }]
  ratingcount=0;
  totalrating=0

  Finalrating:any;
  displayrating:any;
  ngOnInit(): void {
   let videoid= localStorage.getItem('videoid')
   var currentrating=localStorage.getItem('resrating')
  //  this.totalrating +=this.currentrating;
  //  this.Finalrating= (this.totalrating/this.ratingcount).toFixed(2)
   
  //  console.log("videoid in video playing comp",videoid);
  //  console.log("videoname in video playing comp",);

   this._userservice.playVideo(videoid).subscribe((res:any)=>{
    console.log("id is",res._id);
    localStorage.setItem("reportid",res._id)
    console.log("res in onsubmit in video-playing.ts",res)
    console.log("res in onsubmit in video-playing.ts",res.videoName)
    this.displayVideoArray.push(res.videoName);
    // this.videofile=(res);
   })
  
  }
  ratingcontrol=new FormControl(0);
  GetRating(item:any){
    let videoid= localStorage.getItem('videoid')
    this.ratingcount++;
  // var p= JSON.stringify(q)
  //   localStorage.setItem('ratingcount',p)
  //   console.log("value of user",p)
    this.totalrating +=this.ratingcontrol?.value || 0;
    this.Finalrating= (this.totalrating/this.ratingcount).toFixed(2)
    localStorage.setItem('resrating',JSON.stringify(this.Finalrating))
  console.log("rating control value=",this.ratingcount);
  this._userservice.getRating({"id":videoid,"rating":this.ratingcontrol.value}).subscribe((res:any)=>{
    console.log("res in getrating video-playing.ts",res.rating) ;
    this.displayrating=res.rating;
  })
  // console.log("id=",videoid);
  // window.location.reload()
  }
  getreport(){
    console.log("report clicked")
    let username=localStorage.getItem('username')
    var reportid = localStorage.getItem('reportid')
    console.log("id is",reportid);
    let videoid= localStorage.getItem('videoid')
    console.log("id is",videoid);
    this._userservice.report({videoid}).subscribe((res)=>{
      console.log("reported",res._id)
      // localStorage.setItem("reportedid",res._id)
    })
    
  }
}
