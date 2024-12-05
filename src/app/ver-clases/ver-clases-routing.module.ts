import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerClasesPage } from './ver-clases.page';

const routes: Routes = [
  {
    path: '',
    component: VerClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerClasesPageRoutingModule {}
