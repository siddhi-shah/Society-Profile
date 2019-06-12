import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  // hostName= "http://nodebw-env.xctnnannuz.us-east-1.elasticbeanstalk.com";
  // TOKEN = "TOKEN"
  // login(email: string, password: string): Observable<any>{
  //   return this.http.post(this.hostName+'/users/login', {
  //     email: email,
  //     password: password
  //   });
  // }

  // getUser(){
  //   let headers = new HttpHeaders().set('token',localStorage.getItem(this.TOKEN));
  //   return this.http.get(this.hostName+"/users/getUser",{
  //     headers:headers
  //   })

  // }

  

}