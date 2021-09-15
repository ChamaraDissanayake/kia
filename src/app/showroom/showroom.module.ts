import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRoomPageRoutingModule } from './showroom-routing.module';

import { ShowRoomPage } from './showroom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRoomPageRoutingModule
  ],
  declarations: [ShowRoomPage]
})
export class ShowRoomPageModule {}
