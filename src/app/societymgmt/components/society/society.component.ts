import { Component, OnInit, Input, Output, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonServicesService } from '../../reusable/services/common-services.service';
import { SocietyService } from '../../reusable/services/society.service';
import { EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css']
})
export class SocietyComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
  societyList;
  allowSocietyInfoEdit;
  randomText;
  @Input()
  societyId: number
  @Output()
  someText = new EventEmitter<any>();
  emitsomeText(someText) {
    this.someText.emit(someText);
  }
  themeColor = "pink";
  constructor(public dialog: MatDialog,public _CommonServices: CommonServicesService, public _SocietyService: SocietyService) { }

  ngOnInit() {
    this.listenSocietyId();
  }

  listenSocietyId() {
    this._CommonServices.societyInfo.subscribe((societyID) => {
      this.getSocietyById(societyID);
    }
    )
   
  }
  getSocietyById(societyID) {

    this._CommonServices.allowAccessFlag.subscribe((allowAccess)=>{
      this.allowSocietyInfoEdit=allowAccess;
    })

    this._SocietyService.getSocietybyId(societyID).subscribe((societyList) => {
      this.societyList = societyList.data[0];
      console.log(societyList);
     
    })
  }

  openSocietyReceiptDialog(societyId){
    this.dialog.open(SocietyReceiptDialogBox, {
      data: {
        societyId:societyId
      }
    });
  }
}

@Component({
  selector: 'SocietyReceiptDialogBox',
  templateUrl: 'SocietyReceiptDialogBox.html',
})
export class SocietyReceiptDialogBox implements OnInit {
  inputClass = {'is-invalid':false }
  societyReceiptModel={bmaintenance:"0",
             pmaintenance:"0",
             municipaldue:"0",
             sinkingfund:"0",
             electricitycharge:"0",
             flatTypeId:"default"};
 selectedFlatTypes: any[];


flatType=[{"flatTypeName":'1BHK',"flatTypeId":1},
             {"flatTypeName":'2BHK',"flatTypeId":2},
            {"flatTypeName":'3BHK',"flatTypeId":3},
            {"flatTypeName":'4BHK',"flatTypeId":4}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  public _SocietyService: SocietyService,public dialogRef: MatDialogRef<SocietyReceiptDialogBox>) {
  }

  ngOnInit(){
    
  }

  OnSubmitForm()
  {
    this._SocietyService.submitSocietyReceiptForm(this.societyReceiptModel,this.data.societyId).subscribe(result=>{
        if(result){
          alert('Submitted Successfully');
         
        }
    },
    err => {
      alert(err);
    });
      // console.log(this.societyReceiptModel);
       
      //   console.log(this.data.societyId);
  }
  closeDialogBox()
  {
    this.dialogRef.close();
  }



  
}
export interface DialogData {
 
  societyId:any
}
