import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisteredUserLoginPage } from './registered-user-login.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteredUserLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredUserLoginPageRoutingModule {}
