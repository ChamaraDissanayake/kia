import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickAndDropLocationPageRoutingModule } from './pick-and-drop-location-routing.module';

import { PickAndDropLocationPage } from './pick-and-drop-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickAndDropLocationPageRoutingModule
  ],
  declarations: [PickAndDropLocationPage]
})
export class PickAndDropLocationPageModule {}
