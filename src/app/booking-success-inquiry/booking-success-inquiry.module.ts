import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSuccessInquiryPageRoutingModule } from './booking-success-inquiry-routing.module';

import { BookingSuccessInquiryPage } from './booking-success-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSuccessInquiryPageRoutingModule
  ],
  declarations: [BookingSuccessInquiryPage]
})
export class BookingSuccessInquiryPageModule {}
