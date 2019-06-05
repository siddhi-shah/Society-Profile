import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SocietyService} from '../../societymgmt/reusable/services/society.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username;
password;
redirectUrl;


  constructor(public _router:Router,public _societyService:SocietyService,
    public _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
   // this.redirectUrl = this._activatedRoute.snapshot.queryParams['redirectUrl'] || 'societymgmt';
  }
  onLogin(username,password)
  {
    this._societyService.login(username,password).subscribe(r => {
      if (r.token) {
      
        console.log("token set successfully");

        //if(this.redirectUrl == 'societymgmt'){
          console.log(r.dbResponse);
          console.log(r.dbResponse[0].ownerid);
          let ownerId = r.dbResponse[0].ownerid;
         // this._commonService.emitLoginUserInfo(ownerId);
          this._router.navigate(['societymgmt',r.dbResponse[0].ownerid,'flats']);
          // this._commonService.emitLoginUserInfo(r.dbResponse[0].ownerid);
        //} else {
          //this._router.navigateByUrl(this.redirectUrl);
        //  alert('dbfvbd');
        //}
        
        //this.router.navigate(['societyManagment','society']);
        //this.router.navigateByUrl('/societyManagment');
      }
    },
    err => {
      alert(err);
    });
    //  if(username == 'admin' && password=='admin')
    //  {
    //       let ownerId=1;
    //         this._router.navigate(["societymgmt",ownerId, "flats"]);
        
    //  }
    //  else
    //  {
    //    alert('Please enter correct username and password');
    //  }
  }



}
