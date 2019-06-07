import { Component, OnInit, Input, Output, EventEmitter,Inject } from '@angular/core';
import { SocietyService } from '../../../reusable/services/society.service';

@Component({
  selector: 'app-pendingpayment',
  templateUrl: './pendingpayment.component.html',
  styleUrls: ['./pendingpayment.component.css']
})
export class PendingpaymentComponent implements OnInit {
  total: number;
  isEditable = true;
  pageTitle3;
  payamt;
  payingAmount;
  isSocietyAdmin = false
  paymentStructure = {
    dues:0,
    funds:0,
    buildingmaintenance:0,
    parking:0,
    totalMaintenance:0,
    maintenanceAmount:0,
    pendingpayment:0,
    total:0
  }
  @Input()
  pendingPaymentFlatObj;
  @Output()
  paidAmount = new EventEmitter();

  constructor(public _societyService: SocietyService) { 
    console.log("constructor..........",this.pendingPaymentFlatObj);
  }


  // calculateTotal() {
  //   this.total = this.paymentStructure.total+this.pendingPaymentFlatObj.pendingpayment;
  //   console.log(this.total)
  // }

  getPaymentStructure (paymentStructureId){
    this._societyService.getPaymentStructure(paymentStructureId).subscribe((data:any)=>{
            console.log(data.data[0]);
      this.paymentStructure.dues=data.data[0].municipalDue;
      this.paymentStructure.funds=data.data[0].sinkingFund;
      this.paymentStructure.buildingmaintenance=data.data[0].buildingMaintenance;
      this.paymentStructure.parking=data.data[0].parkingMaintenance;
      this.paymentStructure.total = this.pendingPaymentFlatObj.pendingpayment + this.pendingPaymentFlatObj.maintenanceAmount
    })
  }

  payment(amount) {
    let paymentObj =  { "flatid":this.pendingPaymentFlatObj.flatid, "pendingPayment": amount, "ownerid":this.pendingPaymentFlatObj.ownerid, "societyId": this.pendingPaymentFlatObj.societyid}
    this.paidAmount.emit(paymentObj);
  }

  ngOnInit() {
    console.log("payment..........",this.pendingPaymentFlatObj);
    this.getPaymentStructure(this.pendingPaymentFlatObj.paymentStructureId);
  }
}
