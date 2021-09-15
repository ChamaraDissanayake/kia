import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceCenterPage } from './service-center.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceCenterPageRoutingModule {}
