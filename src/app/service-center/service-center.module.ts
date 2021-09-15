import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceCenterPageRoutingModule } from './service-center-routing.module';

import { ServiceCenterPage } from './service-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceCenterPageRoutingModule
  ],
  declarations: [ServiceCenterPage]
})
export class ServiceCenterPageModule {}
