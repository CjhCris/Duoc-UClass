import { Component, OnInit } from '@angular/core';
import { CursoService } from '../providers/curso.service';
import { HttpClient } from '@angular/common/http'; // Importación de HttpClient
import { AnimationController, ModalController } from '@ionic/angular';
import { GenerarQrModalComponent } from './generarQrModal.component';
import { AsistenciaModalComponent } from './AsistenciaModal.component';

@Component({
  selector: 'app-ver-clases',
  templateUrl: './ver-clases.page.html',
  styleUrls: ['./ver-clases.page.scss'],
})
export class VerClasesPage implements OnInit {
  public clases: any[] = []; 
  public cursoNombre: string = ''; 
  public idCurso: number | null = null; 
  public codeClase: string = '';


  constructor(
    private cursoService: CursoService,
    private http: HttpClient,
    private animationCtrl: AnimationController,
    private modalController: ModalController
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID del curso desde el almacenamiento local
    this.idCurso = await this.cursoService.getCursoId(); 
    if (!this.idCurso) {
      alert('No se ha seleccionado un curso.');
    } else {
      console.log('ID del curso cargado:', this.idCurso);

      // Llamar al método para obtener las clases del curso
      this.obtenerClasesDelCurso();
    }
  }

  obtenerClasesDelCurso(): void {
    if (!this.idCurso) {
      console.error('ID del curso no especificado.');
      return;
    }

    // Construcción de la URL para obtener las clases del curso
    const url = `https://www.presenteprofe.cl/api/v1/cursos/${this.idCurso}/clase`;

    // Realizar la solicitud GET a la API
    this.http.get<any>(url).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
        if (response && response.message === 'Listado de clases del curso') {
          this.cursoNombre = response.curso.nombre; 
          this.clases = response.clases;
          this.codeClase = response.clases.codigo_web;
        } else {
          alert('No se pudo obtener la lista de clases.');
        }
      },
      (error) => {
        console.error('Error al obtener las clases:', error);
        alert('Ocurrió un error al obtener las clases. Por favor, revisa la consola para más detalles.');
      }
    );
  }

  async verAsistenciaClase(idClase: any, code: string): Promise<void> {
    let url = 'https://www.presenteprofe.cl/api/v1/cursos/' + idClase + '/clase/'+code;
    console.log('URL de la API:', url);

    this.http.get<any>(url).subscribe(
      async (response: any) => {
        console.log('Respuesta de la API:', response);
        if (response.message === 'Listado de asistencia a la clase') {
          console.log('Datos pasados al modal:', response.asistencias);
          const modal = await this.modalController.create({
            component: AsistenciaModalComponent,
            componentProps: {
              asistencia: response.asistencias,
            },
          })
          await modal.present();
        } else {
          alert('No se pudo obtener la lista de asistencia.');
        }
      },
      (error) => {
        console.error('Error al obtener la asistencia:', error);
        alert('Ocurrió un error al obtener la asistencia. Por favor, revisa la consola para más detalles.');
      }
    );
  }

  async generarQr(codeClase: any){
    const modal = await this.modalController.create({
      component: GenerarQrModalComponent,
      componentProps: {
        codigoClase: codeClase,
      },
    });
    await modal.present();
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
    console.error('Animation is undefined');
    return null;
  };
}

