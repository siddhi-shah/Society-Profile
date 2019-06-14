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
  // lambdaHostName = "localhost:3000"
  // validateTokenUrl = this.lambdaHostName+"/auth/verifyToken";
  lambdaHostName= configuration.URL.LAMBDA_HOST_URL;
  validateTokenUrl = this.lambdaHostName+"/dev/auth/verifyToken";
  constructor(private http: HttpClient,  public _ActivatedRoute: ActivatedRoute) {
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  getToken():any {
    return localStorage.getItem(TOKEN);
  }

  isValidToken(token): Observable<any> {
    let headers = new HttpHeaders().set('x-access-token',token);
    console.log("token --- ",token);
    console.log(`${this.validateTokenUrl}`);
    return this.http.post(`${this.validateTokenUrl}`,{data:"fsdfsdf"},{
      headers:headers
    }).pipe(catchError((error: HttpErrorResponse) => throwError(error)
   ));
  }

  isLogged() :Observable<any> {
    return new Observable(observer => {
      let token = localStorage.getItem(TOKEN)
      if(token) {
        this.isValidToken(token).subscribe(data=>{
          console.log("************", data)
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
