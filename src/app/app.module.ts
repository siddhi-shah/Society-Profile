import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Routes,RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {SocietyMaterialModule} from './material-module';
import { AppComponent } from './app.component';


import { LoginComponent } from './Home/login/login.component';

import { ErrorComponent } from './error/error.component';
import { SocietymgmtComponent } from './societymgmt/societymgmt.component';
import { SocietyComponent } from './societymgmt/components/society/society.component';
import { FlatsComponent } from './societymgmt/components/flats/flats.component';
import { BuildingComponent } from './societymgmt/components/building/building.component';
import { TenantsComponent } from './societymgmt/components/tenants/tenants.component';
import { OwnerComponent } from './societymgmt/components/owner/owner.component';

import { ReverseCharactersPipe } from './societymgmt/reusable/pipes/reverse-characters.pipe';
import { HighlighterDirective } from './societymgmt/reusable/directives/highlighter.directive';
import { RegisterUserComponent } from './home/register-user/register-user.component';





const routes:Routes=[
  // {path:"" ,redirectTo: '/societymgmt', pathMatch:"full"},
 
 

  // {path:"societymgmt/:ownerId",component:SocietymgmtComponent,
  //   children:[
  //     {path:"building",component:BuildingComponent},
  //     {path:"flats",component:FlatsComponent},
  //     {path:"owner",component:OwnerComponent},
  //     {path:"society",component:SocietyComponent},
  //     {path:"tenants",component:TenantsComponent}
  //   ]},
  // {path : "login", component:LoginComponent},
  // {path:"error",component:ErrorComponent},
  // {path:"**",component:ErrorComponent}

]

@NgModule({
  declarations: [
    AppComponent,
   
    LoginComponent,
   
    ErrorComponent,
    SocietymgmtComponent,
    SocietyComponent,
    FlatsComponent,
    BuildingComponent,
    TenantsComponent,
    OwnerComponent,
    
    ReverseCharactersPipe,
    
    HighlighterDirective,
    
    RegisterUserComponent
    
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
   HttpClientModule,
   BrowserAnimationsModule,
   [MatButtonModule, MatCheckboxModule],
   SocietyMaterialModule,
   ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
