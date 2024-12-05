import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { NavController } from '@ionic/angular';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Curso } from '../models/cursos'
import { AuthService } from '../providers/auth.service';
import { CursoService } from '../providers/curso.service';


@Component({
  selector: 'app-asignaturas-profesor',
  templateUrl: './asignaturas-profesor.page.html',
  styleUrls: ['./asignaturas-profesor.page.scss'],
})
export class AsignaturasProfesorPage implements OnInit {
  cursos: Curso[] = [];
  errorMessage: string = '';

  constructor(private proveedor: ProveedorCursosService, private auth: AuthService, private cursoService: CursoService) {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {
    this.obtenerCursosProfesor();
  }

  obtenerCursosProfesor() {
    this.proveedor.obtenerCursosProfesor().subscribe(
      (response: any) => {
        if (response.message === 'Success') {
          this.cursos = response.cursos;
        } else {
          this.errorMessage = 'No se han encontrado cursos';
        }
      },
      (error: any) => {
        this.errorMessage = 'Hubo un problema al cargar los cursos.';
        console.error('Error al obtener los cursos del profesor:', error);
      }
    );
  }
  
  async guardarCursoId(id: number) {
    await this.cursoService.setCursoId(id); // Guarda el ID en Capacitor Preferences
    console.log('ID del curso seleccionado guardado:', id);
  }
  
}
