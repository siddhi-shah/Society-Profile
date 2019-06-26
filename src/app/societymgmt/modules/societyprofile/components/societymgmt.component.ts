import { Component, OnInit } from '@angular/core';
import { CommonServicesService } from 'src/app/societymgmt/reusable/services/common-services.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { SocietyService } from 'src/app/societymgmt/reusable/services/society.service';
import { TokenService } from 'src/app/societymgmt/reusable/services/token.service';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-societymgmt',
  templateUrl: './societymgmt.component.html',
  styleUrls: ['./societymgmt.component.css']
})
export class SocietymgmtComponent implements OnInit {

  themeColor = "white";
  currentDate = new Date();
 



  constructor(public _tokenService:TokenService, public _router:Router) { }

  ngOnInit() {
   
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
  
  logout(){
    this._tokenService.setToken("");
    this._router.navigate(['login']);
  }

  

}



