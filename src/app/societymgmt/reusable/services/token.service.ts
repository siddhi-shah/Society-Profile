import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import configuration from './../../../config'

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  lambdaHostName= configuration.URL.LAMBDA_HOST_URL;
  validateTokenUrl = this.lambdaHostName+"/auth/verifyToken";
  constructor(private http: HttpClient,  public _ActivatedRoute: ActivatedRoute) {
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken():any {
    return localStorage.getItem(TOKEN);
  }

  isValidToken(token): Observable<any> {
    return this.http.post(`${this.validateTokenUrl}`,{})
    .pipe(catchError((error: HttpErrorResponse) => throwError(error)
   ));
  }

  isLogged() :Observable<any> {
    return new Observable(observer => {
      let token = this.getToken();
      if(token) {
        this.isValidToken(token).subscribe(data=>{
          if(data.type == "success"){
            observer.next(true);
          } else {
            alert("User is not Valid");
            observer.next(false);
          }
        }, error=>{
          console.log(error);
          observer.next(false);
        })
      } else {
        console.log(false);
       observer.next(false);
      }
    })
  }



}
