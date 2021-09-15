import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PhoneVerifyPageRoutingModule } from './phone-verify-routing.module';

import { PhoneVerifyPage } from './phone-verify.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneVerifyPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PhoneVerifyPage]
})
export class PhoneVerifyPageModule {}
