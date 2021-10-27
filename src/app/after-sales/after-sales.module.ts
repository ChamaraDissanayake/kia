import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfterSalesPageRoutingModule } from './after-sales-routing.module';

import { AfterSalesPage } from './after-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfterSalesPageRoutingModule
  ],
  declarations: [AfterSalesPage]
})
export class AfterSalesPageModule {}
