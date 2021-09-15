import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestDriveRegistrationPageRoutingModule } from './test-drive-registration-routing.module';

import { TestDriveRegistrationPage } from './test-drive-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TestDriveRegistrationPageRoutingModule
  ],
  declarations: [TestDriveRegistrationPage]
})
export class TestDriveRegistrationPageModule {}
