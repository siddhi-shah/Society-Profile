import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import configuration from './../../../config'

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  //hostName= "http://nodebw-env.xctnnannuz.us-east-1.elasticbeanstalk.com";
  lambdaHostName = configuration.URL.LAMBDA_HOST_URL;
  constructor(public _httpclient : HttpClient) { }

  login(email: string, password: string) :Observable<any>{
    return this._httpclient.post(this.lambdaHostName+'/dev/auth/loginUser', {
      email: email,
      password: password
    });
  } 

  submitSocietyReceiptForm(societyReceiptModel,societyId){
    return this._httpclient.post(this.lambdaHostName+'/dev/payment-and-reciept/societyReciept', {
      buildingMaintenance: societyReceiptModel.bmaintenance,
      parkingMaintenance: societyReceiptModel.pmaintenance,
      municipalDue:societyReceiptModel.municipaldue,
      sinkingFund:societyReceiptModel.sinkingfund,
      electricityCharge:societyReceiptModel.electricitycharge,
      createdBy:1,id:1,societyId:societyId,
      flatTypeArr:[2]

    });
  }


  getPaymentStructure(paymentStructureId) {
    return this._httpclient.get(`${this.lambdaHostName}/dev/payment-and-reciept/societyReciept?paymentStructureId=${paymentStructureId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
  ));
  }

  getPaymentHistory(flatId): Observable<any>{
    return this._httpclient.get(`${this.lambdaHostName}/dev/payment-and-reciept/paymentHistory?flatId=${flatId}`)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  updateFlatPayment(paymentObj): Observable<any>{
    return this._httpclient.put(`${this.lambdaHostName}/dev/payment-and-reciept/pendingPayment`,paymentObj)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }


  getflatsbyowner(ownerID): Observable<any>{
    return this._httpclient.get(`${this.lambdaHostName}/dev/flat/ownerFlats?ownerId=${ownerID}`)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  getSocietybyId(societyId) : Observable<any>
  {
    return this._httpclient.get(`${this.lambdaHostName}/dev/society/getSocietyInfo?societyId=${societyId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  getFlatsBySocietyId(societyId) : Observable<any>
  {
    return this._httpclient.get(`${this.lambdaHostName}/dev/flat/societyFlats?societyId=${societyId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }
  getLoginUserInfo(ownerId):Observable<any>
  {
    //return this._httpclient.get(`${this.hostName}/society/owner/ownerid/?value=${ownerId}`)
    return this._httpclient.get(`${this.lambdaHostName}/dev/owner/ownerDetails?ownerId=${ownerId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }
}
