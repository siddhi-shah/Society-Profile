import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userModel={userName:"Siddhi",
             email:"shahsiddhir@gmail.com",
             phone:"9385897387",
             userTypeId:"default",
             gender:"1"};
  userType=[{"userTypeName":'Society Admin',"userId":2},
              {"userTypeName":'User',"userId":3}];

  selectedUserTypeObject;
  hasError=true;
  inputClass = {'is-invalid':true, }
  constructor() { }

  ngOnInit() {
  }

  OnSubmitForm()
  {

  }

  validateSelection(userTypeId)
  {
    if(userTypeId == "default")
    {
      this.hasError=true;
    }
    else
    {
      this.hasError=false;
    }
  }

 
}
