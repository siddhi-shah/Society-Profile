import { Component, OnInit, Input, Output, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonServicesService } from 'src/app/societymgmt/reusable/services/common-services.service';
import { SocietyService } from 'src/app/societymgmt/reusable/services/society.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-society',
  templateUrl: './society.component.html',
  styleUrls: ['./society.component.css']
})
export class SocietyComponent implements OnInit, OnChanges {

  societyList;
  ownerId;
  allowSocietyInfoEdit;
  randomText;
  @Input()
  societyId: number

  themeColor = "pink";
  constructor( public _ActivatedRoute:ActivatedRoute, public dialog: MatDialog, public _CommonServices: CommonServicesService, public _SocietyService: SocietyService) { }

  ngOnInit() {
    this.listenSocietyId();
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (let propName in changes) {
    //   let chng = changes[propName];
    //   let cur = JSON.stringify(chng.currentValue);
    //   let prev = JSON.stringify(chng.previousValue);
    //   console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    // }
  }

  listenSocietyId() {
    this._CommonServices.societyInfo.subscribe((societyID) => {
      this.getSocietyById(societyID);
      this.setOwnerId();
    })
  }

  setOwnerId() {
    this._ActivatedRoute.parent.params.subscribe(async (params) => {
      this.ownerId = params.ownerId;
    })
  }
  getSocietyById(societyID) {
    this._CommonServices.allowAccessFlag.subscribe((allowAccess) => {
      this.allowSocietyInfoEdit = allowAccess;
    })
    this._SocietyService.getSocietybyId(societyID).subscribe((societyList) => {
      this.societyList = societyList.data[0];
      console.log(societyList);

    })
  }

  openSocietyReceiptDialog(societyId) {
    this.dialog.open(SocietyReceiptDialogBox, {
      data: {
        societyId: societyId,
        ownerId :this.ownerId
      },
      disableClose: true,
      height: '600px',
      width: '400px',
    });
  }
}

@Component({
  selector: 'SocietyReceiptDialogBox',
  templateUrl: 'SocietyReceiptDialogBox.html',
})
export class SocietyReceiptDialogBox implements OnInit {
  inputClass = { 'is-invalid': false };
  dropdownList = [];
  dropdownSettings = {};
  societyReceiptModel = {
    bmaintenance: "0",
    pmaintenance: "0",
    municipaldue: "0",
    sinkingfund: "0",
    electricitycharge: "0",
    societyId:null,
    flatTypeArr: [],
    createdBy:null
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,public _commonServicesService:CommonServicesService,
    public _SocietyService: SocietyService, public dialogRef: MatDialogRef<SocietyReceiptDialogBox>) {
  }

  ngOnInit() {
    this.dropDownConfig()
  }

  dropDownConfig(){
    this.dropdownList = [
      { item_id: 1, item_text: '1 BHK' },
      { item_id: 2, item_text: '2 BHK' },
      { item_id: 3, item_text: '3 BHK' },
      { item_id: 4, item_text: '4 BHK' },
      { item_id: 5, item_text: '5 BHK' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.societyReceiptModel.flatTypeArr.push(item.item_id);
  }
  onSelectAll(items: any) {
    this.societyReceiptModel.flatTypeArr= items.map(({ item_id }) => item_id);
  }

  OnSubmitForm() {
    this.societyReceiptModel.societyId = this.data.societyId;
    this.societyReceiptModel.createdBy = this.data.ownerId;
    this._SocietyService.submitSocietyReceiptForm(this.societyReceiptModel).subscribe(result => {
      if(result){
        this.dialogRef.close();
        this._commonServicesService.emitFormSubmitedEvent();
        alert('Submitted Successfully');

      }
    },err => {
        alert(err);
      });
  }
  closeDialogBox(){
    this.dialogRef.close();
  }  
}
export interface DialogData {

  societyId: number
  ownerId:number
}
