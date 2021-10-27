import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingAccessoryConfirmedPage } from './booking-accessory-confirmed.page';

const routes: Routes = [
  {
    path: '',
    component: BookingAccessoryConfirmedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingAccessoryConfirmedPageRoutingModule {}
