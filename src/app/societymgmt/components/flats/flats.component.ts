import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SocietyService } from '../../reusable/services/society.service';
import { ActivatedRoute } from '@angular/router';
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
  selectedSocietyId = 1;
  selectedFlatDetails;
  societyid;
  dataSource;
  flatObj:any;
  selectedOption = "myFlats";
  paymentHistoryData;
  displayedHistoryColumns;
  responseData;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,public _SocietyService: SocietyService, public _ActivatedRoute: ActivatedRoute,
    public _CommonServices: CommonServicesService) { }

  ngOnInit() {
    this.getFlatDetailByOwnerId();
  }
  getFlatDetailByOwnerId(callback?: any) {
    this._ActivatedRoute.parent.params.subscribe((params) => {
      let ownerId = params.ownerId;
      console.log("owner id is", ownerId);
      this._SocietyService.getflatsbyowner(ownerId).subscribe((flatsinfo) => {
        console.log(flatsinfo);
        this.flatInfo = flatsinfo.dbResponse;
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
    this.societyid = societyid;
    this._SocietyService.getFlatsBySocietyId(societyId).subscribe((flatsinfo) => {
      console.log(flatsinfo);
      this.flatInfo = flatsinfo.dbResponse;
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
        alert("Payment successfully updated!");
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

  // showFlatPatmentHistory(flatId){
  //   this._SocietyService.getPaymentHistory(flatId).subscribe((data) => {
  //     console.log("*****>>>>",data);
  //     this.paymentHistoryData= data.data;
  //     this.displayedHistoryColumns   = ['idpaymenthistory', 'paid', 'remainingbalance', 'createddate'];
  //     const ELEMENT_DATA: flatPaymentHistory[] =data.data;
  //     this.dataSource = new MatTableDataSource<flatPaymentHistory>(ELEMENT_DATA);

  //     this.dataSource.paginator = this.paginator;
  //     //this.displayedColumns   = ['societyid', 'societyname', 'address', 'pincode','showBuilding', 'delete'];
  //     //this._commonService.emitCalanderData(data.dbResponse);
  //   },
  //     error => {
  //       console.log("-------->",error);
  //       this.errorMessage = error.message;
  //     });
  // }


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
