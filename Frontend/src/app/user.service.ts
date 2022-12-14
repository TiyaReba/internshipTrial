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
  private _imageupload ="http://localhost:3000/uploadimage";
  private _getvideo ="http://localhost:3000/getvideo";
  private _getimage ="http://localhost:3000/getimage"
  private _deletevideo="http://localhost:3000/deletevideo/";
  private _playvideo="http://localhost:3000/playvideo/";
  private _addrating="http://localhost:3000/addrating/";
  private _reportvideo="http://localhost:3000/reportedvideo/";
  private _issuevideo="http://localhost:3000/issuevideo/"
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
    console.log("inside userservice file of uploadVideo",body)
    return this.http.post<any>(this._videoupload,body)
  }
  imageUpload(body:any){
    console.log("inside userservice file of uploadimage",body)
    return this.http.put<any>(this._imageupload,body)
  }
  getVideo(videoname:any){
    console.log("inside userservice file of getvideo",videoname)
    return this.http.get<any>(this._getvideo+videoname)
  }
  getImage(){
    console.log("inside userservice file of getimage")
    return this.http.get<any>(this._getimage)
  }
  playVideo(id:any){
    console.log("inside userservice file of playvideo")
    return this.http.get<any>(this._playvideo+id)
  }

  deleteVideo(id:any){
    console.log("inside service of deletevideo",id)
    return this.http.delete<any>(this._deletevideo+id)
  }
getRating(body:any){
  console.log("inside service of getrating",body)
  return this.http.put<any>(this._addrating,body);
}
report(body:any){
  console.log("inside report service file",);
  return this.http.put<any>(this._reportvideo,body)
}
issuevideos(){
  console.log("inside issue videos service file")
  return this.http.get<any>(this._issuevideo)
}
}
