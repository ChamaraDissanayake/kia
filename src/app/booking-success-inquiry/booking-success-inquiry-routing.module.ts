import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSuccessInquiryPage } from './booking-success-inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSuccessInquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSuccessInquiryPageRoutingModule {}
