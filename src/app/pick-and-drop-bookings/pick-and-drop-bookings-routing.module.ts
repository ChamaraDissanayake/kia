import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAndDropBookingsPage } from './pick-and-drop-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: PickAndDropBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAndDropBookingsPageRoutingModule {}
