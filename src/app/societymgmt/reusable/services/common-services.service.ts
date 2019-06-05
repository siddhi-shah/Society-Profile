import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

   societyInfo = new EventEmitter<any>();
  // loginUserInfo = new EventEmitter<any>();

  constructor() { }

  emitSocietyInfo(societyId)
  {
    this.societyInfo.emit(societyId);
  }
  // emitLoginUserInfo(ownerId)
  // {
  //   this.loginUserInfo.emit(ownerId);
  // }

  

}
