import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickDropViewPage } from './pick-drop-view.page';

const routes: Routes = [
  {
    path: '',
    component: PickDropViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickDropViewPageRoutingModule {}
