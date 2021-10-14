import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoriesOrdersPage } from './accessories-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AccessoriesOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoriesOrdersPageRoutingModule {}
