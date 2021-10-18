import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickDropViewPageRoutingModule } from './pick-drop-view-routing.module';

import { PickDropViewPage } from './pick-drop-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickDropViewPageRoutingModule
  ],
  declarations: [PickDropViewPage]
})
export class PickDropViewPageModule {}
