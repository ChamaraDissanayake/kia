import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowroomListPageRoutingModule } from './showroom-list-routing.module';

import { ShowroomListPage } from './showroom-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowroomListPageRoutingModule
  ],
  declarations: [ShowroomListPage]
})
export class ShowroomListPageModule {}
