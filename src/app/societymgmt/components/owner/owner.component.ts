import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { SocietyService } from '../../reusable/services/society.service';
import { TokenService } from '../../reusable/services/token.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CommonServicesService } from '../../reusable/services/common-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  loginUserInfo = {
    name: "",
    id: "",
    email: "",
    phone: ""
  }
  ownerId;
  inputClass = {'is-invalid':true, }

  constructor(public _tokenService:TokenService, public _router:Router, public _commonService: CommonServicesService,
    public _activatedRoute: ActivatedRoute, public _societyService: SocietyService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.listenOwnerId();
    
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
      this.loginUserInfo.id = userInfo.data[0].ownerid;
      this.loginUserInfo.phone = userInfo.data[0].phonenumber;
      this.loginUserInfo.email = userInfo.data[0].email;
      console.log(this.loginUserInfo.name);

 
    });
  }

  openOwnerEditInfoDialogBox()
  {
    this.dialog.open(OwnerEditInfoDialogBox,{
      data:{
        ownerId:this.ownerId
      }
    });
  }

}

@Component({
  selector: 'OwnerEditInfoDialogBox',
  templateUrl: 'OwnerEditInfoDialogBox.html',
})
export class OwnerEditInfoDialogBox implements OnInit {
  inputClass = {'is-invalid':false }
 
  ownerInfoModel={
    
    ownername:"Siddhi",
    email:"shahsiddhir@gmail.com",
    phone:"9767855986",
    dateofbirth:"1995-12-16",
    gender:"1"
  }

  constructor(public dialogRef: MatDialogRef<OwnerEditInfoDialogBox>,  public _activatedRouteEdit: ActivatedRoute,
    public _SocietyService: SocietyService, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public datepipe: DatePipe) {
  }

  ngOnInit(){
    
  }
  OnSubmitForm()
  {
    
    this._SocietyService.updateOwnerInfoForm(this.ownerInfoModel,this.data.ownerId).subscribe(result=>{
          if(result){
            alert('Updated Successfully');
          
          }
      },
      err => {
        alert(err);
      });
  
       console.log(this.ownerInfoModel);
  }
  
  closeDialogBox()
  {
    this.dialogRef.close();
  }

  formatDate() {
    var newDate = new Date(`${this.ownerInfoModel.dateofbirth} UTC`);
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
   // this.ownerInfoModel.dateofbirth=newDate.toString();
    let latest_date =this.datepipe.transform(this.ownerInfoModel.dateofbirth, 'yyyy-MM-dd');
    this.ownerInfoModel.dateofbirth = latest_date.toString();
    return latest_date.toString();
  }

 
}

export interface DialogData {
  ownerId:any;
  
}