import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './home/login/login.component';

import { ErrorComponent } from './error/error.component';
import { SocietymgmtComponent } from './societymgmt/modules/societyprofile/components/societymgmt.component';
import { SocietyComponent } from './societymgmt/modules/societyprofile/components/society/society.component';
import { FlatsComponent } from './societymgmt/modules/societyprofile/components/flats/flats.component';
import { BuildingComponent } from './societymgmt/modules/societyprofile/components/building/building.component';
import { TenantsComponent } from './societymgmt/modules/societyprofile/components/tenants/tenants.component';
import { OwnerComponent } from './societymgmt/modules/societyprofile/components/owner/owner.component';
import { RegisterUserComponent } from './home/register-user/register-user.component';
import { NeedAuthGuard } from './societymgmt/reusable/services/need-auth-guard.service'

const routes: Routes = [
  {path:"" ,redirectTo: '/login', pathMatch:"full"},
  {path:"lazy",loadChildren:'./lazy/lazy.module#LazyModule'},
  {path:"societymgmt/:ownerId",component:SocietymgmtComponent,
        children:[
          {path:"building",component:BuildingComponent},
          {path:"flats",component:FlatsComponent, canActivate: [NeedAuthGuard] },
          {path:"owner",component:OwnerComponent},
          {path:"society",component:SocietyComponent},
          {path:"tenants",component:TenantsComponent}
        ]},
  {path : "login", component:LoginComponent},
  {path : "registerUser", component:RegisterUserComponent},
  {path:"error",component:ErrorComponent},
  {path:"**",component:ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
