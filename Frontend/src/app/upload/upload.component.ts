import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  displayVideo!: boolean;
  displayVideoArray!:Array<any>
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  videos:any
  p:any
  constructor(private _userservice:UserService,public http : HttpClient) {
    this.displayVideo=false;
    this.displayVideoArray=[];
   }

  ngOnInit(): void {
  }
  selectVideo(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]
      console.log("files:",file)
      this.videos=file
    }
   

  }

  onSubmit(){
    // construct fomdata
    const formdata = new FormData();
    formdata.append('file',this.videos);
    console.log("formdata in onsubmit in upload.ts",this.videos)
    this._userservice.videoUpload(formdata).subscribe((res)=>{
      
       console.log("res in onsubmit in upload.ts",res.filename)
      this.singleInput.nativeElement.value ="";
      this.displayVideo=true;
      this.displayVideoArray.push(res.filename)
     }
    )
    
    


  // post
  // this.http.post<any>("http://localhost:3000/uploadvideo",formdata)
  // .subscribe((res)=>{
  //   console.log(res)
  //   this.singleInput.nativeElement.value ="";
  //     this.displayVideo=true;
  // }),(err: any)=>{
  //   console.log(err)
  // }

}
}