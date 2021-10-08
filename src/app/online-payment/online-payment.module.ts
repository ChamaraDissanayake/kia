import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlinePaymentPageRoutingModule } from './online-payment-routing.module';

import { OnlinePaymentPage } from './online-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlinePaymentPageRoutingModule
  ],
  declarations: [OnlinePaymentPage]
})
export class OnlinePaymentPageModule {}
