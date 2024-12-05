import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerClasesPageRoutingModule } from './ver-clases-routing.module';

import { VerClasesPage } from './ver-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerClasesPageRoutingModule
  ],
  declarations: [VerClasesPage]
})
export class VerClasesPageModule {}
