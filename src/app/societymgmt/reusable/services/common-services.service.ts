import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

   societyInfo = new EventEmitter<any>();
   loginUserInfo = new EventEmitter<any>();
   allowAccessFlag = new EventEmitter<any>();
   formSubmitedEvent = new EventEmitter<any>();
   ownerFormEvent = new EventEmitter<any>();

  constructor() { }

  emitFormSubmitedEvent(){
    this.formSubmitedEvent.emit(true);
  }

  emitOwnerFormSubmitedEvent(){
    this.ownerFormEvent.emit(true);
  }

  emitSocietyInfo(societyId)
  {
    this.societyInfo.emit(societyId);
  }
  emitLoginUserInfo(ownerId)
  {
    this.loginUserInfo.emit(ownerId);
  }
  emiteditRole(allowAccess)
  {
    this.allowAccessFlag.emit(allowAccess);
  }
}
