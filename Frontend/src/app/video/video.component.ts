import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Itemmodel } from './item.model';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
// import { filter } from 'core-js/core/array';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  displayVideoArray!:Array<any>
  titleArray!:Array<any>
  loggedUser : any ='';

  constructor(private _userservice:UserService,public _authservice:AuthService,private router: Router) { 
  this.displayVideoArray=[];
  this.titleArray=[]

}
videofile :Itemmodel[]|any;
item=[{
  title:'',
  videoName:'',
  imageName:'',
  subTitle:'',
  dis:'',
  rating:''
}]
  ngOnInit(): void {
    this.loggedUser = this._authservice.getCurrentUser();
    this._userservice.getImage().subscribe((res)=>{
      console.log("res length in onsubmit in upload.ts",res.length)
      console.log("res in onsubmit in upload.ts",res)
      
      //  for(let i=0;i<=res.length;i++){
        // let video=res[i].videoName
        // let q= res[i].title;
      
        // console.log("res[i] in onsubmit in upload.ts",res[i])
   this.videofile=(res);
        // this.displayVideoArray.push(res);
        // this.titleArray.push(q);
        // console.log("videofile in video.ts",this.videofile.title)
      //  }
    })
  }
deleteVideo(item:any){
  console.log('videoid:',item._id)
  this._userservice.deleteVideo(item._id).subscribe((res:any)=>{
    Swal.fire(
      'Deleted!',
  'Video has been deleted.',
  'success'
    )
     this.videofile=this.videofile.filter((p:any)=>p!==item)
  })
  window.location.reload()
}
getloguser(){
  this.loggedUser = this._authservice.getCurrentUser(); 
  // console.log("loggeduser",this.loggedUser)
  if(this.loggedUser=="admin"){
    return true;}
    else if(this.loggedUser=="sadmin"){
      return true;
    }
    else{
      return false;
    }
  }
  ImageClick(item:any){
    console.log('videoid in video component:',item._id)
    localStorage.setItem('videoid',item._id);
    this.router.navigate(['/videoPlaying'])
  }
}
