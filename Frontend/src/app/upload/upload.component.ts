import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  displayVideo!: boolean;
  displayImage!: boolean;
  displayText!: boolean;
  displayVideoArray!:Array<any>
  displayImageArray!:Array<any>
  displayTextArray!:Array<any>
  url: string | ArrayBuffer | null | undefined;
  format: string | undefined;
  @ViewChild('singleInput', { static: false })
  singleInput!: ElementRef;
  videos:any
  image:any
  text:any
  subTitle:any
  dis:any

  uploadForm ={
  title:'',
  videos:'',
  image:'',
  subTitle:'',
  dis:'', 
  }


  constructor(private _userservice:UserService,public http : HttpClient,private router: Router,) {
    this.displayVideo=false;
    this.displayImage=false;
    this.displayText=false;
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
  // onSelectFile(event:any){
  //   const file = event.target.files && event.target.files[0];
  //   if(file){
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     if(file.type.indexOf('image')> -1){
  //       this.format = 'image';
  //       this.image=file
  //       console.log("format",this.format)
  //       console.log("image selection",this.image)
  //     } else if(file.type.indexOf('video')> -1){
  //       this.format = 'video';
  //       this.videos=file
  //       console.log("format",this.format)
  //       console.log("video selection",this.videos)
  //     }
  //     else if(file.type.indexOf('text')> -1){
  //       this.format = 'text';
  //       this.text=file
  //       console.log("format",this.format)
  //       console.log("subtitle selection",this.text)
  //     }
    
  //    }
  // }
  selectImage(event:any){
    if(event.target.files.length > 0){
      const imagefile = event.target.files[0]
      console.log("files:",imagefile)
      this.image=imagefile
    }
  }
  selectSubTitle(event:any){
    if(event.target.files.length > 0){
      const subTitlefile = event.target.files[0]
      console.log("files:",subTitlefile)
      this.subTitle=subTitlefile;
    }

  }
  onSubmit(formValue:NgForm){
    // construct fomdata
    const formdata = new FormData();

    formdata.append('file',this.videos);
    
    formdata.append('file',this.image);
    formdata.append('file',this.subTitle);
     formdata.append('title',this.uploadForm.title);
     formdata.append('dis',this.uploadForm.dis);
      
    console.log("this.videos in onsubmit in upload.ts",this.videos)
    // console.log("thumbnail in onsubmit in upload.ts",this.image)
    this._userservice.videoUpload(formdata).subscribe((res)=>{
        this.singleInput.nativeElement.value ="";
       console.log("res in onsubmit in upload.ts",res.videoName)
      this.displayVideo=true;
       this.displayVideoArray.push(res.fileName)   
     }
    )
    this.router.navigate(['/video'])   
    // window.location.reload()
     }
  

}