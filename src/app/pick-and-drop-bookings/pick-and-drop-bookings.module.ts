import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PickAndDropBookingsPageRoutingModule } from './pick-and-drop-bookings-routing.module';

import { PickAndDropBookingsPage } from './pick-and-drop-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PickAndDropBookingsPageRoutingModule
  ],
  declarations: [PickAndDropBookingsPage]
})
export class PickAndDropBookingsPageModule {}
