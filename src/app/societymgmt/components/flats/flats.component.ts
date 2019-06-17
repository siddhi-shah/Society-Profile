import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SocietyService } from '../../reusable/services/society.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../../reusable/services/common-services.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {
  flatInfo;
  errorMessage;
  isClosedValue = false;
  uniqueSocietyId;
  selectedSocietyId;
  selectedFlatDetails;
  //societyid;
  dataSource;
  flatObj:any;
  selectedOption = "myFlats";
  paymentHistoryData;
  displayedHistoryColumns;
  responseData;
  allowAccessCount=0;
  allowAccess=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,public _SocietyService: SocietyService, public _ActivatedRoute: ActivatedRoute,
    public _CommonServices: CommonServicesService, public _router:Router) { }

  ngOnInit() {
    this.getFlatDetailByOwnerId();
    this.listenMaintanaceFormSubmit();
  }

  listenMaintanaceFormSubmit(){
    this._CommonServices.formSubmitedEvent.subscribe((flag)=>{
      if(flag){
        this.showFlatAndSocietyDetailBySocietyId(this.selectedSocietyId);
      }
    })
  }

  validateUserAgainstToken (ownerId){
    return new Promise((resolve, reject)=>{
      let token = localStorage.getItem("TOKEN")
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let tokenOwnerId = decodedJwtData.ownerid;
      if(ownerId != tokenOwnerId) {
        console.log("ownerid missmatch!!");
        this._router.navigate(['login']);
      } else {
        resolve();
      }
    })
  }

   getFlatDetailByOwnerId(callback?: any) {
    this._ActivatedRoute.parent.params.subscribe(async (params) => {
      let ownerId = params.ownerId;
      await this.validateUserAgainstToken(ownerId);
      console.log("owner id is", ownerId);
      this._SocietyService.getflatsbyowner(ownerId).subscribe((flatsinfo) => {
        console.log(flatsinfo);
        this.flatInfo = flatsinfo.data;
        if (this.selectedSocietyId) {
          this.showFlatDetailsBySocietyId(this.selectedSocietyId);
        }
        if (callback) {
          callback();
        }
        this.uniqueSocietyId = [...Array.from(new Set<any>(this.flatInfo.map(({ societyid }) => societyid))).sort()];

      }, error => {
        console.log('got error', error);
      });
    }, error => {
      console.log('got error --', error);
    })

  }

  getFlatDetailBySocietyId(societyid, callback?: any) {
    let societyId = societyid;
    this.selectedSocietyId = societyid;
    this._SocietyService.getFlatsBySocietyId(societyId).subscribe((flatsinfo) => {
      console.log(flatsinfo);
      this.flatInfo = flatsinfo.data;
      this.showFlatDetailsBySocietyId(societyid);
      if (callback) {
        callback();
      }
    }, error => {
      console.log('got error', error);
    });
  }

  showFlatAndSocietyDetailBySocietyId(societyid) {
    this._CommonServices.emitSocietyInfo(societyid);
    if (this.selectedOption == "myFlats") {
      this.getFlatDetailByOwnerId(() => {
        this.showFlatDetailsBySocietyId(societyid);
      });
    }
    else {
      this.getFlatDetailBySocietyId(societyid, () => {
        this.showFlatDetailsBySocietyId(societyid);
      });
    }
  }
  showFlatDetailsBySocietyId(societyid) {
    this.selectedFlatDetails = this.flatInfo.filter(val => val.societyid == societyid)
    this.dataSource = this.selectedFlatDetails;
    this.showSubmitReceipt(this.dataSource);
  }

  openPaymentDialog(flat) {
    this.flatObj = flat;
    const dialogRef = this.dialog.open(FlatDialogBox, {
      data: {
        flatObj:flat
      }
    });
    dialogRef.afterClosed().subscribe(amount => {
      console.log('The dialog was closed');
      if(amount)
      this.paymentMethod(amount);
    });
  }

  paymentMethod(paymentObj){
   // this.flatObj.pendingPayment = payAmount; 
   let societyId = paymentObj.societyId;
   delete paymentObj.societyId;
    this._SocietyService.updateFlatPayment(paymentObj).subscribe(
      (data) => {
      this.responseData = data.data;
      },
      error => {
        console.log(error);
        //this.errmsg=error.message;
        alert("Please login first"+JSON.stringify(error));
      },
      () => {
        this.isClosedValue = true
        this.showFlatAndSocietyDetailBySocietyId(societyId);
        this.openDialog();
        //alert("Payment successfully updated!");
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(confirmationDialog, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openPaymentHistoryDialog(flatId){
    this.dialog.open(PaymentHistoryDialogBox, {
      data: {
        flatId:flatId
      }
    });
  }


  displayedColumns: string[] = ['flatid', 'flatname', 'FlatType', 'buildingname', 'tenantid', 'pendingpayment', 'maintenanceAmount','createdDate', 'updatedDate', 'ownerid', 'pay', 'paymentHistory'];

 
  showSubmitReceipt(data)
  {
    this._ActivatedRoute.parent.params.subscribe((params) => {
      let ownerId = params.ownerId;

      this.allowAccessCount = 0;
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if (data[i].role == 2 && data[i].ownerid == ownerId) {
          this.allowAccessCount++;
        }
      }

      if (this.allowAccessCount >= 1) {
        this.allowAccess = true;
      }
      else {
        this.allowAccess = false;
      }
      this._CommonServices.emiteditRole(this.allowAccess);
      console.log(this.allowAccess);

    });
  }

}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'flat-dialogBox.html',
})
export class FlatDialogBox {
  constructor(public dialogRef: MatDialogRef<FlatDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  paymentMethod(amount){
    this.dialogRef.close(amount);
  }
}

@Component({
  selector: 'confirmation-dialogBox',
  templateUrl: 'confirmation-dialogBox.html',
})
export class confirmationDialog {
  constructor(public dialogRef: MatDialogRef<FlatDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}



export interface DialogData {
  flatObj: any;
  flatId:any
}

@Component({
  selector: 'PaymentHistoryDialogBox',
  templateUrl: 'PaymentHistoryDialogBox.html',
})
export class PaymentHistoryDialogBox implements OnInit {
  paymentHistoryData;
  displayedColumns;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(public _SocietyService: SocietyService,public dialogRef: MatDialogRef<FlatDialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(){
    this.showFlatPatmentHistory(this.data.flatId)
  }
  paymentHistoryMethod(amount){
    this.dialogRef.close(amount);
  }

  showFlatPatmentHistory(flatId){
    this._SocietyService.getPaymentHistory(flatId).subscribe((data) => {
      console.log(data.data);
      this.paymentHistoryData= data.data;
      this.displayedColumns   = ['idpaymenthistory', 'amount', 'remainingbalance', 'createddate','updatedby','updateddate'];
      const ELEMENT_DATA: flatPaymentHistory[] =data.data;
      this.dataSource = new MatTableDataSource<flatPaymentHistory>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error);
        alert("something went wrong");
      });
  }
}

export interface flatPaymentHistory {
  createddate: string;
  flatid: number;
  idpaymenthistory: number;
  paymentType:number;
  ownerid: number;
  paid: number;
  remainingbalance:number;
  updateddate:string
}
