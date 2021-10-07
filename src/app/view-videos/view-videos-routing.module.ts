import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVideosPage } from './view-videos.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVideosPageRoutingModule {}
