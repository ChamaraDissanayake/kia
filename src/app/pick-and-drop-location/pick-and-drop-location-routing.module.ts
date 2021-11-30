import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAndDropLocationPage } from './pick-and-drop-location.page';

const routes: Routes = [
  {
    path: '',
    component: PickAndDropLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAndDropLocationPageRoutingModule {}
