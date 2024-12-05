import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'ingresar',
    loadChildren: () => import('./ingresar/ingresar.module').then( m => m.IngresarPageModule)
  },
  {
    path: 'crear-asignatura',
    loadChildren: () => import('./crear-asignatura/crear-asignatura.module').then( m => m.CrearAsignaturaPageModule)
  },
  {
    path: 'crear-clase',
    loadChildren: () => import('./crear-clase/crear-clase.module').then( m => m.CrearClasePageModule)
  },
  {
    path: 'asignaturas-profesor',
    loadChildren: () => import('./asignaturas-profesor/asignaturas-profesor.module').then( m => m.AsignaturasProfesorPageModule)
  },
  {
    path: 'detalle-curso-estudiante',
    loadChildren: () => import('./detalle-curso-estudiante/detalle-curso-estudiante.module').then( m => m.DetalleCursoEstudiantePageModule)
  },
  {
    path: 'ver-clases',
    loadChildren: () => import('./ver-clases/ver-clases.module').then( m => m.VerClasesPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'ver-asistencia',
    loadChildren: () => import('./ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },
  

  
    

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
