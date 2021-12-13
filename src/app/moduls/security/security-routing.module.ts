import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { UnauthenticatedGuard } from '../../guards/unauthenticated.guard';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';

const routes: Routes = [
   {
      path:'login',
      component:LoginComponent,
      canActivate: [UnauthenticatedGuard]
   },
   {
      path:'logout',
      component:LoginComponent,
      canActivate: [AuthenticatedGuard]
   },
   {
      path:'update-password',
      component:UpdatePasswordComponent,
      canActivate: [AuthenticatedGuard]
   },
   {
      path:'reset-password',
      component: RecoveryPasswordComponent,
      canActivate: [UnauthenticatedGuard]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
