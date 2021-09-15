import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageEstimateViewPageRoutingModule } from './damage-estimate-view-routing.module';

import { DamageEstimateViewPage } from './damage-estimate-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DamageEstimateViewPageRoutingModule
  ],
  declarations: [DamageEstimateViewPage]
})
export class DamageEstimateViewPageModule {}
