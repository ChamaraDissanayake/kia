import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestPartViewPage } from './request-part-view.page';

const routes: Routes = [
  {
    path: '',
    component: RequestPartViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPartViewPageRoutingModule {}
