import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoriesViewPage } from './accessories-view.page';

const routes: Routes = [
  {
    path: '',
    component: AccessoriesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoriesViewPageRoutingModule {}
