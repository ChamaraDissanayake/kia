import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageEstimateRespondPage } from './damage-estimate-respond.page';

const routes: Routes = [
  {
    path: '',
    component: DamageEstimateRespondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageEstimateRespondPageRoutingModule {}
