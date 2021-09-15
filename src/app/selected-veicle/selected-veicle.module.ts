import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedVeiclePageRoutingModule } from './selected-veicle-routing.module';

import { SelectedVeiclePage } from './selected-veicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedVeiclePageRoutingModule
  ],
  declarations: [SelectedVeiclePage]
})
export class SelectedVeiclePageModule {}
