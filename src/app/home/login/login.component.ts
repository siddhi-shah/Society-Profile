import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SocietyService} from '../../societymgmt/reusable/services/society.service';
import {TokenService} from '../../societymgmt/reusable/services/token.service';
import {CommonServicesService} from '../../societymgmt/reusable/services/common-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username;
password;
redirectUrl;


  constructor(private _tokenService: TokenService,public _router:Router,public _societyService:SocietyService,
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



}
