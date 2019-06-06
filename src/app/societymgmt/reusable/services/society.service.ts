import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  hostName= "http://nodebw-env.xctnnannuz.us-east-1.elasticbeanstalk.com";
  lambdaHostName = "https://uedyhinf4i.execute-api.us-east-1.amazonaws.com"
  constructor(public _httpclient : HttpClient) { }

  login(email: string, password: string) :Observable<any>{
    return this._httpclient.post(this.hostName+'/users/login', {
      email: email,
      password: password
    });
  } 

  getPaymentStructure(paymentStructureId) {
    return this._httpclient.get(`${this.lambdaHostName}/dev/societyReciept?paymentStructureId=${paymentStructureId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
  ));
  }

  getPaymentHistory(flatId): Observable<any>{
    return this._httpclient.get(`${this.lambdaHostName}/dev/paymentHistory?flatId=${flatId}`)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  updateFlatPayment(paymentObj): Observable<any>{
    console.log("*****><><><>", paymentObj);
    return this._httpclient.put(`${this.lambdaHostName}/dev/pendingPayment`,paymentObj)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }


  getflatsbyowner(ownerID): Observable<any>{
    return this._httpclient.get(`${this.hostName}/society/flat/ownerid/?value=${ownerID}`)
      .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  getSocietybyId(societyId) : Observable<any>
  {
    return this._httpclient.get(`${this.hostName}/society/society/societyid/?value=${societyId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }

  getFlatsBySocietyId(societyId) : Observable<any>
  {
    return this._httpclient.get(`${this.hostName}/society/flat/societyid/?value=${societyId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }
  getLoginUserInfo(ownerId):Observable<any>
  {
    return this._httpclient.get(`${this.hostName}/society/owner/ownerid/?value=${ownerId}`)
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
    ));
  }
}
