import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import{MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { VideoComponent } from './video/video.component';
import { SadminComponent } from './sadmin/sadmin.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { VideoPlayingComponent } from './video-playing/video-playing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IssuesComponent } from './issues/issues.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserDetailsComponent,
    VideoComponent,
    SadminComponent,
    UploadComponent,
    HeaderComponent,
    VideoPlayingComponent,
    IssuesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
     MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
    
  ],
  providers: [AuthService,AuthGuard,UserService,
  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
