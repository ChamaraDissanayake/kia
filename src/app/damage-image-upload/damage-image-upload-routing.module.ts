import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageImageUploadPage } from './damage-image-upload.page';

const routes: Routes = [
  {
    path: '',
    component: DamageImageUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageImageUploadPageRoutingModule {}
