import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageEstimatePage } from './damage-estimate.page';

const routes: Routes = [
  {
    path: '',
    component: DamageEstimatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageEstimatePageRoutingModule {}
