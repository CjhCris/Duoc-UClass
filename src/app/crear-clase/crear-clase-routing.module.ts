import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearClasePage } from './crear-clase.page';

const routes: Routes = [
  {
    path: '',
    component: CrearClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearClasePageRoutingModule {}
