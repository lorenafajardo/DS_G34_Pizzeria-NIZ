import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { EditPersonComponent } from '../administration/person/edit-person/edit-person.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
   declarations: [
      RecoveryPasswordComponent,
      UpdatePasswordComponent,

      LoginComponent,
      LogoutComponent,
   ],
   imports: [
      CommonModule,
      SecurityRoutingModule,
      FormsModule,
      ReactiveFormsModule
   ]
})
export class SecurityModule { }
