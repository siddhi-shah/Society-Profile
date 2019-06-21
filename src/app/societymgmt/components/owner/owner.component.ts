import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { SocietyService } from '../../reusable/services/society.service';
import { TokenService } from '../../reusable/services/token.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MAT_DATE_FORMATS } from '@angular/material';
import { CommonServicesService } from '../../reusable/services/common-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  loginUserInfo = {
    name: undefined,
    id: undefined,
    email: undefined,
    phone: undefined,
    dateOfBirth:undefined,
    gender:undefined
  }
  ownerId;
  inputClass = {'is-invalid':true, }

  constructor(public _tokenService:TokenService, public _router:Router, public _commonService: CommonServicesService,
    public _activatedRoute: ActivatedRoute, public _societyService: SocietyService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.listenOwnerId();
    this.listenOwnerFormSubmition();
  }

  listenOwnerFormSubmition(){
    this._commonService.ownerFormEvent.subscribe((flag)=>{
      if(flag){
        this.listenOwnerId();
      }
    })
  }

  listenOwnerId() {
    this._activatedRoute.params.subscribe((params) => {
      let ownerId = params.ownerId;
      this.ownerId = ownerId;
      this.getloginUserInfo(ownerId);
    })

    this._commonService.loginUserInfo.subscribe((ownerId) => {
      this.getloginUserInfo(ownerId);
    });
  }
  getloginUserInfo(ownerId) {
    this._societyService.getLoginUserInfo(ownerId).subscribe((userInfo) => {
      this.loginUserInfo.name = userInfo.data[0].ownername;
      this.loginUserInfo.dateOfBirth = userInfo.data[0].dateOfBirth;
      this.loginUserInfo.gender = userInfo.data[0].gender;
      this.loginUserInfo.id = ownerId;
      this.loginUserInfo.phone = userInfo.data[0].phonenumber;
      this.loginUserInfo.email = userInfo.data[0].email;
      console.log(this.loginUserInfo.name);
    });
  }

  openOwnerEditInfoDialogBox()
  {
    this.dialog.open(OwnerEditInfoDialogBox,{
      data:this.loginUserInfo,
      disableClose: true,
      height: '600px',
      width: '400px',
    });
  }

}

export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric' }
    }
};



@Component({
  selector: 'OwnerEditInfoDialogBox',
  templateUrl: 'OwnerEditInfoDialogBox.html',
  providers: [{
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
 }]
})
export class OwnerEditInfoDialogBox implements OnInit {
  inputClass = {'is-invalid':false }
 
  ownerInfoModel={
    
    ownername:undefined,
    email:undefined,
    phone:undefined,
    dateofbirth:undefined,
    gender:undefined
  }

  constructor(public _commonServices:CommonServicesService, public dialogRef: MatDialogRef<OwnerEditInfoDialogBox>,  public _activatedRouteEdit: ActivatedRoute,
    public _SocietyService: SocietyService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public datepipe: DatePipe) {
  }

  ngOnInit(){
    this.setOwnerInfo(this.data)
  }
  setOwnerInfo(ownerInfo){
    console.log("ownerInfo",ownerInfo);
    this.ownerInfoModel.dateofbirth = this.formatDate(ownerInfo.dateOfBirth) ;
    this.ownerInfoModel.email = ownerInfo.email;
    this.ownerInfoModel.gender = String(ownerInfo.gender);
    this.ownerInfoModel.ownername = ownerInfo.name;
    this.ownerInfoModel.phone = ownerInfo.phone;
  }
  OnSubmitForm()
  {
    this.ownerInfoModel.dateofbirth = this.formatDate(this.ownerInfoModel.dateofbirth) ;
    this._SocietyService.updateOwnerInfoForm(this.ownerInfoModel,this.data.id).subscribe(result=>{
          if(result){
            alert('Updated Successfully');
            this.closeDialogBox();
          }
      },
      err => {
        alert(err);
      });
  
       console.log(this.ownerInfoModel);
  }
  
  closeDialogBox()
  {
    this._commonServices.emitOwnerFormSubmitedEvent();
    this.dialogRef.close();
    
  }

  formatDate(dateOfBirth) {
    if(dateOfBirth){
      console.log("dateOfBirth", dateOfBirth);
      var newDate = new Date(`${dateOfBirth} UTC`);
      newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
     // this.ownerInfoModel.dateofbirth=newDate.toString();
      let latest_date =this.datepipe.transform(dateOfBirth, 'yyyy-MM-dd');
      this.ownerInfoModel.dateofbirth = latest_date.toString();
      return latest_date.toString();
    } else {
      return ""
    }
  }

 
}

export interface DialogData {
  id:any;
}

