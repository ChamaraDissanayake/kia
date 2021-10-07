import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewVideosPageRoutingModule } from './view-videos-routing.module';

import { ViewVideosPage } from './view-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewVideosPageRoutingModule
  ],
  declarations: [ViewVideosPage]
})
export class ViewVideosPageModule {}
