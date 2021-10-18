import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAndDropPage } from './pick-and-drop.page';

const routes: Routes = [
  {
    path: '',
    component: PickAndDropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAndDropPageRoutingModule {}
