import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { CrearClase } from '../models/clase';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../providers/curso.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.page.html',
  styleUrls: ['./crear-clase.page.scss'],
})
export class CrearClasePage implements OnInit {
  public fecha: string = '';
  public hora_inicio: string = '';
  public hora_termino: string = '';
  public minFecha: string = ''; 
  private idCurso: number | null = null;
  public codeClass: string = '';
  isAlertOpen = false;

  constructor(
    private cursoService: CursoService,
    private http: HttpClient,
    private animationCtrl: AnimationController
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);
    }

    // Inicializar minFecha con la fecha de hoy en formato "YYYY-MM-DD"
    const today = new Date();
    this.minFecha = today.toISOString().split('T')[0];
  }


  enviarFormulario(): void {
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
      return;
    }

    const url = `https://www.presenteprofe.cl/api/v1/cursos/${this.idCurso}/clase`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Crear el objeto de formulario a enviar
    const form: CrearClase = {
      fecha: this.fecha,
      hora_inicio: this.hora_inicio,
      hora_termino: this.hora_termino
    };

    console.log('Datos enviados a la API:', form);

    // Enviar solicitud POST con los datos del formulario y encabezados
    this.http.post(url, form, { headers }).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
        if (response.message === 'Clase creada exitosamente') {
          this.codeClass = response.codigo_qr; 
          console.log('Codigo de la clase generado:', this.codeClass);
        } else if (response.message === 'No autenticado') {
        alert('No autenticado');
        } else if (response.message === 'Curso no encontrado') {
          alert('Curso no encontrado');
        }
      },
      (error) => {
        console.error('Error al crear la clase:', error);
        alert('Ocurrió un error al crear la clase. Por favor, revisa la consola para más detalles.');
      }
    );
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    if (!root) {
      console.error('Root is null');
      return;
    }

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    const animation = this.enterAnimation(baseEl);
    if (animation) {
      return animation.direction('reverse');
    }
    return null;
  };
}

