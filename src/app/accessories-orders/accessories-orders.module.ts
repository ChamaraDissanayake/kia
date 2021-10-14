import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessoriesOrdersPageRoutingModule } from './accessories-orders-routing.module';

import { AccessoriesOrdersPage } from './accessories-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessoriesOrdersPageRoutingModule
  ],
  declarations: [AccessoriesOrdersPage]
})
export class AccessoriesOrdersPageModule {}
