import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallUsPage } from './call-us.page';

const routes: Routes = [
  {
    path: '',
    component: CallUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallUsPageRoutingModule {}
