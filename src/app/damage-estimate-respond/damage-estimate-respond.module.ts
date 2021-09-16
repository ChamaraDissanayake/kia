import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageEstimateRespondPageRoutingModule } from './damage-estimate-respond-routing.module';

import { DamageEstimateRespondPage } from './damage-estimate-respond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DamageEstimateRespondPageRoutingModule
  ],
  declarations: [DamageEstimateRespondPage]
})
export class DamageEstimateRespondPageModule {}
