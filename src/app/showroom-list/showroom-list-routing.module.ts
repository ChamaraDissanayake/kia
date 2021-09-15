import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowroomListPage } from './showroom-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShowroomListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowroomListPageRoutingModule {}
