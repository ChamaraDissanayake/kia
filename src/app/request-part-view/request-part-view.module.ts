import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestPartViewPageRoutingModule } from './request-part-view-routing.module';

import { RequestPartViewPage } from './request-part-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPartViewPageRoutingModule
  ],
  declarations: [RequestPartViewPage]
})
export class RequestPartViewPageModule {}
