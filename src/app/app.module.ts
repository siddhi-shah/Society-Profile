import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {SocietyMaterialModule} from './material-module';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
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
