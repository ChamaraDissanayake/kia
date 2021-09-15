import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedVeiclePage } from './selected-veicle.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedVeiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedVeiclePageRoutingModule {}
