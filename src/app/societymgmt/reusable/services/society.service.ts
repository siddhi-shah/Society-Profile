import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  hostName= "http://nodebw-env.xctnnannuz.us-east-1.elasticbeanstalk.com";
  constructor(public _httpclient : HttpClient) { }

  login(email: string, password: string) :Observable<any>{
    return this._httpclient.post(this.hostName+'/users/login', {
      email: email,
      password: password
    });
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
