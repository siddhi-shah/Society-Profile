import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import configuration from './../../../config'
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lambdaHostName = configuration.URL.LAMBDA_HOST_URL;
  constructor(private http: HttpClient) {

  }

  redirectToGoogleLogin(){
    return this.http.get(this.lambdaHostName+"/auth/googleOAuth2Redirect")
    .pipe(catchError((error:HttpErrorResponse) => throwError(error)
  ));
  }

}