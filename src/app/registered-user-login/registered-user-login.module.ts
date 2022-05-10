import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisteredUserLoginPageRoutingModule } from './registered-user-login-routing.module';

import { RegisteredUserLoginPage } from './registered-user-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisteredUserLoginPageRoutingModule
  ],
  declarations: [RegisteredUserLoginPage]
})
export class RegisteredUserLoginPageModule {}
