import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingAccessoryConfirmedPageRoutingModule } from './booking-accessory-confirmed-routing.module';

import { BookingAccessoryConfirmedPage } from './booking-accessory-confirmed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingAccessoryConfirmedPageRoutingModule
  ],
  declarations: [BookingAccessoryConfirmedPage]
})
export class BookingAccessoryConfirmedPageModule {}
