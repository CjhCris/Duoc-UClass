import { Component, OnInit } from '@angular/core';
import { CursoService } from '../providers/curso.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  public asistencias: any[] = []; 
  public cursoNombre: string = ''; 
  private idCurso: number | null = null; 

  constructor(
    private cursoService: CursoService,
    private http: HttpClient 
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);

      // Llamar al método para obtener las asistencias del curso
      this.obtenerAsistencia();
    }
  }

  obtenerAsistencia(): void {
    if (!this.idCurso) {
      console.error('ID del curso no especificado.');
      return;
    }

    // Construcción de la URL para obtener las asistencias
    const url = `https://www.presenteprofe.cl/api/v1/cursos/${this.idCurso}/inasistencias`;

    // Realizar la solicitud GET a la API
    this.http.get<any>(url).subscribe(
      (response: any) => {
        console.log('Respuesta de la API (Asistencias):', response);
        if (response && response.message === 'Listado de asistencias') {
          this.cursoNombre = response.curso.nombre; 
          this.asistencias = response.asistencias; 
        } else {
          alert('No se pudo obtener la lista de asistencias.');
        }
      },
      (error) => {
        console.error('Error al obtener las asistencias:', error);
        alert('Ocurrió un error al obtener las asistencias. Por favor, revisa la consola para más detalles.');
      }
    );
  }
}
