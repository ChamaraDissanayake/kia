import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarRatingPage } from './star-rating.page';

const routes: Routes = [
  {
    path: '',
    component: StarRatingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarRatingPageRoutingModule {}
