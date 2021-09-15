import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageEstimateRespondPageRoutingModule } from './damage-estimate-respond-routing.module';

import { DamageEstimateRespondPage } from './damage-estimate-respond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DamageEstimateRespondPageRoutingModule
  ],
  declarations: [DamageEstimateRespondPage]
})
export class DamageEstimateRespondPageModule {}
