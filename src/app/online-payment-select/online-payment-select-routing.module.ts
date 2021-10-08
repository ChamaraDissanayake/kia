import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlinePaymentSelectPage } from './online-payment-select.page';

const routes: Routes = [
  {
    path: '',
    component: OnlinePaymentSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlinePaymentSelectPageRoutingModule {}
