import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageEstimateViewPage } from './damage-estimate-view.page';

const routes: Routes = [
  {
    path: '',
    component: DamageEstimateViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageEstimateViewPageRoutingModule {}
