import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickAndDropBookPage } from './pick-and-drop-book.page';

const routes: Routes = [
  {
    path: '',
    component: PickAndDropBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickAndDropBookPageRoutingModule {}
