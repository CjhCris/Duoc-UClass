import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCursoEstudiantePage } from './detalle-curso-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCursoEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCursoEstudiantePageRoutingModule {}
