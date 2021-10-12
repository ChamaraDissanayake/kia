import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RequestPartPageRoutingModule } from './request-part-routing.module';

import { RequestPartPage } from './request-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestPartPageRoutingModule
  ],
  declarations: [RequestPartPage]
})
export class RequestPartPageModule {}
