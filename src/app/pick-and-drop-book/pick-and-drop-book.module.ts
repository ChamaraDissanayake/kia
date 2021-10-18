import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickAndDropBookPageRoutingModule } from './pick-and-drop-book-routing.module';

import { PickAndDropBookPage } from './pick-and-drop-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PickAndDropBookPageRoutingModule
  ],
  declarations: [PickAndDropBookPage]
})
export class PickAndDropBookPageModule {}
