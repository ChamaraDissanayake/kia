import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinePaymentSelectPageRoutingModule } from './online-payment-select-routing.module';

import { OnlinePaymentSelectPage } from './online-payment-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinePaymentSelectPageRoutingModule
  ],
  declarations: [OnlinePaymentSelectPage]
})
export class OnlinePaymentSelectPageModule {}
