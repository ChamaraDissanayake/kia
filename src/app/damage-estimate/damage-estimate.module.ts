import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageEstimatePageRoutingModule } from './damage-estimate-routing.module';

import { DamageEstimatePage } from './damage-estimate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DamageEstimatePageRoutingModule
  ],
  declarations: [DamageEstimatePage]
})
export class DamageEstimatePageModule {}
