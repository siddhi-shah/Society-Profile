import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService } from '../../societymgmt/reusable/services/auth-api.service'
import {ActivatedRoute} from '@angular/router';
import {SocietyService} from '../../societymgmt/reusable/services/society.service';
import {TokenService} from '../../societymgmt/reusable/services/token.service';
import {CommonServicesService} from '../../societymgmt/reusable/services/common-services.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username;
password;
redirectUrl;
windowData;
private scope = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/admin.directory.user.readonly'
].join(' ');
public auth2: any;
  constructor(public _apiService:ApiService, private _tokenService: TokenService,public _router:Router,public _societyService:SocietyService,
    public _activatedRoute:ActivatedRoute,public _commonService:CommonServicesService) { }

  ngOnInit() {
   // this.redirectUrl = this._activatedRoute.snapshot.queryParams['redirectUrl'] || 'societymgmt';
  }
  onLogin(username,password)
  {
    this._societyService.login(username,password).subscribe(result => {
      if (result.data) {
          
          //let ownerId = result.data[0].ownerid;
          //this._commonService.emitLoginUserInfo(ownerId);
          this._tokenService.setToken(result.data);
          console.log("data is ", result.data);
          let jwtData = result.data.split('.')[1];
          let decodedJwtJsonData = window.atob(jwtData);
          let decodedJwtData = JSON.parse(decodedJwtJsonData);
          let tokenOwnerId = decodedJwtData.ownerid;
          this._router.navigate(['societymgmt',tokenOwnerId,'flats']);
      }
    },
    err => {
      alert(err);
    });
  }



  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '565169698431-po5383lk9mbgj5ott62cud1btrkgjacl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

}
