import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPartRequestsPageRoutingModule } from './my-part-requests-routing.module';

import { MyPartRequestsPage } from './my-part-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPartRequestsPageRoutingModule
  ],
  declarations: [MyPartRequestsPage]
})
export class MyPartRequestsPageModule {}
