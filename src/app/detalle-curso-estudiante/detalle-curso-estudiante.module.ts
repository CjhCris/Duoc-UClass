import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCursoEstudiantePageRoutingModule } from './detalle-curso-estudiante-routing.module';

import { DetalleCursoEstudiantePage } from './detalle-curso-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCursoEstudiantePageRoutingModule
  ],
  declarations: [DetalleCursoEstudiantePage]
})
export class DetalleCursoEstudiantePageModule {}
