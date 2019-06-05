import { Component, OnInit } from '@angular/core';
import {SocietyService} from '../../reusable/services/society.service';
import {ActivatedRoute} from '@angular/router';
import { CommonServicesService} from '../../reusable/services/common-services.service';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.css']
})
export class FlatsComponent implements OnInit {
  flatInfo;
  uniqueSocietyId;
  selectedSocietyId=1;
  selectedFlatDetails;
  societyid;
  dataSource;
  selectedOption = "myFlats";
  
  constructor(public _SocietyService:SocietyService, public _ActivatedRoute : ActivatedRoute,
    public _CommonServices : CommonServicesService) { }

  ngOnInit() {
    this.getFlatDetailByOwnerId();
    
  }

  getFlatDetailByOwnerId(callback?:any){
    //console.log("**********",this.selectedSocietyId)
    this._ActivatedRoute.parent.params.subscribe((params)=>{
      let ownerId = params.ownerId;
      console.log("owner id is", ownerId);
      this._SocietyService.getflatsbyowner(ownerId).subscribe((flatsinfo) => {
        console.log(flatsinfo);
      this.flatInfo = flatsinfo.dbResponse;
      //console.log("&&&&&&&&&&",this.selectedSocietyId)
      if(this.selectedSocietyId) {
        this.showFlatDetailsBySocietyId(this.selectedSocietyId);
      }

      if(callback){
        callback();
      }

      //this.showSocietyById(1);
       this.uniqueSocietyId = [...Array.from(new Set<any>(this.flatInfo.map(({societyid})=>societyid))).sort()];
     
      }, error => {
        console.log('got error',error);
      });
    }, error => {
      console.log('got error --',error);
    })

  }

  getFlatDetailBySocietyId(societyid, callback?:any){
    
   // this._ActivatedRoute.parent.params.subscribe((params)=>{
      let societyId = societyid;
      //console.log("owner id is", societyId);
      this._SocietyService.getFlatsBySocietyId(societyId).subscribe((flatsinfo) => {
        console.log(flatsinfo);
      this.flatInfo = flatsinfo.dbResponse;
      this.showFlatDetailsBySocietyId(societyid);
      if(callback){
        callback();
      }
     // this.showFlatsBySocietyId(societyid);
      // this.uniqueSocietyId = [...Array.from(new Set<any>(this.flatInfo.map(({societyid})=>societyid))).sort()];
     
      }, error => {
        console.log('got error',error);
      });
   // }, error => {
    //  console.log('got error --',error);
   // })

  }

  showFlatAndSocietyDetailBySocietyId(societyid)
  {
    this._CommonServices.emitSocietyInfo(societyid);
    if (this.selectedOption == "myFlats") {
      this.getFlatDetailByOwnerId(()=>{
        this.showFlatDetailsBySocietyId(societyid);
      });
    }
    else {
      this.getFlatDetailBySocietyId(societyid, ()=>{
        this.showFlatDetailsBySocietyId(societyid);
      });
    }



   }
   showFlatDetailsBySocietyId(societyid){
    this.selectedFlatDetails = this.flatInfo.filter(val => val.societyid == societyid)
    console.log(this.selectedFlatDetails);

    this.dataSource = this.selectedFlatDetails;
    console.log(this.dataSource);
   }

   displayedColumns: string[] = ['flatid', 'flatname', 'buildingname','pendingpayment','createdDate','updatedDate','ownerid','maintenanceAmount','role','actions'];
  // dataSource = this.selectedFlatDetails;
  // seletectedFlatDetails(sid)
  // {
  //   //this.selectedFlatDetails = this.flatInfo.filter((sid) => sid == 1);
  //  // this.selectedFlatDetails = this.flatInfo;

   
   
  // }
  // flatUniqueData()
  // {
  //   this.uniqueSocietyId=[...Array.from(new Set<any>(this.flatInfo.map(({societyid})=>societyid)))];
  //   console.log( [...Array.from(new Set<any>(this.flatInfo.map(({societyid})=>societyid)))]);
  // }


}
