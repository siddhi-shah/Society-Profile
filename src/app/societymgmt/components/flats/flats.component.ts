import { Component, OnInit } from '@angular/core';
import { SocietyService } from '../../reusable/services/society.service';
import { ActivatedRoute } from '@angular/router';
import { CommonServicesService } from '../../reusable/services/common-services.service';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {
  flatInfo;
  uniqueSocietyId;
  selectedSocietyId = 1;
  selectedFlatDetails;
  societyid;
  dataSource;
  selectedOption = "myFlats";

  constructor(public _SocietyService: SocietyService, public _ActivatedRoute: ActivatedRoute,
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
  displayedColumns: string[] = ['flatid', 'flatname', 'buildingname', 'societyid', 'tenantid', 'pendingpayment', 'createdDate', 'updatedDate', 'ownerid'];


}
