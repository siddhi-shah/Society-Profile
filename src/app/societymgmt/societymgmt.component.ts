import { Component, OnInit } from '@angular/core';
import {CommonServicesService} from './reusable/services/common-services.service';
import {ActivatedRoute} from '@angular/router';
import { SocietyService} from './reusable/services/society.service';

@Component({
  selector: 'app-societymgmt',
  templateUrl: './societymgmt.component.html',
  styleUrls: ['./societymgmt.component.css']
})
export class SocietymgmtComponent implements OnInit {
  temp;
  themeColor = "white";
  currentDate=new Date();
  xyz;
  loginUserInfo = {
    name:"",
    id:"",
    email:"",
    phone:""
  }

  constructor(public _commonService:CommonServicesService,
    public _activatedRoute:ActivatedRoute,public _societyService : SocietyService) { }

  ngOnInit() {
   this.listenOwnerId();
  }

  showselectedTheme(selectTheme)
  {
    if(selectTheme=="dark"){
        this.themeColor="grey";
    }
    else if(selectTheme=="light"){
      this.themeColor="pink";
    }
    else{
      this.themeColor="white";
    }
  }
  listenOwnerId()
  {
          this._activatedRoute.params.subscribe((params)=>{
      let ownerId = params.ownerId;
      console.log("333333333333",ownerId);
      this.getloginUserInfo(ownerId);
    })

      this._commonService.loginUserInfo.subscribe((ownerId)=>{
          console.log("ffghgfhxfg",ownerId);
          this.getloginUserInfo(ownerId);
      });
  }
  getloginUserInfo(ownerId)
  {
        this._societyService.getLoginUserInfo(ownerId).subscribe((userInfo)=>{
              //this.xyz=userInfo.dbResponse[0].ownername;
              this.loginUserInfo.name = userInfo.dbResponse[0].ownername;
              this.loginUserInfo.id = userInfo.dbResponse[0].ownerid;
              this.loginUserInfo.phone = userInfo.dbResponse[0].phoneNumber;
              this.loginUserInfo.email = userInfo.dbResponse[0].email;
              console.log(this.loginUserInfo.name);
        });
  }
  // xyz()
  // {
  //   this._activatedRoute.parent.params.subscribe((params)=>{
  //     let ownerId = params.ownerId;
  //     console.log(ownerId);
  //   });
  // }

}
