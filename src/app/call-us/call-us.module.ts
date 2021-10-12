import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallUsPageRoutingModule } from './call-us-routing.module';

import { CallUsPage } from './call-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallUsPageRoutingModule
  ],
  declarations: [CallUsPage]
})
export class CallUsPageModule {}
