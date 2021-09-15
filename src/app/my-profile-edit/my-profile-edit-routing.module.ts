import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfileEditPage } from './my-profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfileEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileEditPageRoutingModule {}
