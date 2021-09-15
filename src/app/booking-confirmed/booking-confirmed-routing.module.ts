import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingConfirmedPage } from './booking-confirmed.page';

const routes: Routes = [
  {
    path: '',
    component: BookingConfirmedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingConfirmedPageRoutingModule {}
