import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickAndDropPageRoutingModule } from './pick-and-drop-routing.module';

import { PickAndDropPage } from './pick-and-drop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickAndDropPageRoutingModule
  ],
  declarations: [PickAndDropPage]
})
export class PickAndDropPageModule {}
