import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from '../reusable/services/common-services.service';
import { ActivatedRoute } from '@angular/router';
import { SocietyService } from '../reusable/services/society.service';

@Component({
  selector: 'app-societymgmt',
  templateUrl: './societymgmt.component.html',
  styleUrls: ['./societymgmt.component.css']
})
export class SocietymgmtComponent implements OnInit {

  themeColor = "white";
  currentDate = new Date();
  loginUserInfo = {
    name: "",
    id: "",
    email: "",
    phone: ""
  }

  constructor(public _commonService: CommonServicesService,
    public _activatedRoute: ActivatedRoute, public _societyService: SocietyService) { }

  ngOnInit() {
    this.listenOwnerId();
  }

  showselectedTheme(selectTheme) {
    if (selectTheme == "dark") {
      this.themeColor = "grey";
    }
    else if (selectTheme == "light") {
      this.themeColor = "pink";
    } else {
      this.themeColor = "white";
    }
  }
  listenOwnerId() {
    this._activatedRoute.params.subscribe((params) => {
      let ownerId = params.ownerId;
      this.getloginUserInfo(ownerId);
    })

    this._commonService.loginUserInfo.subscribe((ownerId) => {
      this.getloginUserInfo(ownerId);
    });
  }
  getloginUserInfo(ownerId) {
    this._societyService.getLoginUserInfo(ownerId).subscribe((userInfo) => {
      this.loginUserInfo.name = userInfo.data[0].ownername;
      this.loginUserInfo.id = userInfo.data[0].ownerid;
      this.loginUserInfo.phone = userInfo.data[0].phoneNumber;
      this.loginUserInfo.email = userInfo.data[0].email;
      console.log(this.loginUserInfo.name);
    });
  }

}
