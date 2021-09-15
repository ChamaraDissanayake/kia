import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDriveRegistrationPage } from './test-drive-registration.page';

const routes: Routes = [
  {
    path: '',
    component: TestDriveRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDriveRegistrationPageRoutingModule {}
