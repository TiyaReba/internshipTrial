import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UploadComponent } from './upload/upload.component';
import { UserDetailsComponent} from './user-details/user-details.component'
import {VideoComponent} from './video/video.component'
import {VideoPlayingComponent} from './video-playing/video-playing.component'
import {IssuesComponent} from './issues/issues.component'
const routes: Routes = [
  {path:'',
  redirectTo:'/login',
  pathMatch:'full'},
  {path:'login',
  component:LoginComponent},
  {path:'signup',
  component:SignupComponent,
},
  {path:'userdetails',
  component:UserDetailsComponent,
  canActivate:[AuthGuard]},
  {path:'video',
  component:VideoComponent,
  canActivate:[AuthGuard]},
  {path:'upload',
  component:UploadComponent,
  canActivate:[AuthGuard]},
  {path:'videoPlaying',
  component:VideoPlayingComponent,
  canActivate:[AuthGuard]
  },
  {path:'issues',
  component:IssuesComponent,
  canActivate:[AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
