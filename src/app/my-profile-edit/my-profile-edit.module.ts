import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfileEditPageRoutingModule } from './my-profile-edit-routing.module';

import { MyProfileEditPage } from './my-profile-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyProfileEditPageRoutingModule
  ],
  declarations: [MyProfileEditPage]
})
export class MyProfileEditPageModule {}
