import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterSalesPage } from './after-sales.page';

const routes: Routes = [
  {
    path: '',
    component: AfterSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfterSalesPageRoutingModule {}
