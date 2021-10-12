import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestPartPage } from './request-part.page';

const routes: Routes = [
  {
    path: '',
    component: RequestPartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPartPageRoutingModule {}
