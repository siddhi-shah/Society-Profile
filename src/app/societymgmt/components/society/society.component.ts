import { Component, OnInit, Input, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonServicesService } from '../../reusable/services/common-services.service';
import { SocietyService } from '../../reusable/services/society.service';
import { EventEmitter } from '@angular/core';

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
  randomText;
  @Input()
  societyId: number
  @Output()
  someText = new EventEmitter<any>();
  emitsomeText(someText) {
    this.someText.emit(someText);
  }
  themeColor = "pink";
  constructor(public _CommonServices: CommonServicesService, public _SocietyService: SocietyService) { }

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
    this._SocietyService.getSocietybyId(societyID).subscribe((societyList) => {
      this.societyList = societyList.dbResponse[0];
      console.log(societyList);
    })
  }
}
