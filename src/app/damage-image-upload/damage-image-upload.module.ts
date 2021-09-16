import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageImageUploadPageRoutingModule } from './damage-image-upload-routing.module';

import { DamageImageUploadPage } from './damage-image-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DamageImageUploadPageRoutingModule
  ],
  declarations: [DamageImageUploadPage]
})
export class DamageImageUploadPageModule {}
