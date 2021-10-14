import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessoriesViewPageRoutingModule } from './accessories-view-routing.module';

import { AccessoriesViewPage } from './accessories-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessoriesViewPageRoutingModule
  ],
  declarations: [AccessoriesViewPage]
})
export class AccessoriesViewPageModule {}
