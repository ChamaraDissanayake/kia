import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarRatingPageRoutingModule } from './star-rating-routing.module';

import { StarRatingPage } from './star-rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingPageRoutingModule
  ],
  declarations: [StarRatingPage]
})
export class StarRatingPageModule {}
