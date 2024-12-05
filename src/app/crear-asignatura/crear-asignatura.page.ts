import { Component, OnInit } from '@angular/core';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Cursos } from '../models/crear-asignatura';
import { crearAsignatura } from '../models/crear-asignatura';
import { AuthService } from '../providers/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
})
export class CrearAsignaturaPage implements OnInit {
  public sigla: string = '';
  public nombre: string = '';
  public institucion: string = '';
  public descripcion: string = '';

  constructor(private alertController: AlertController,private api: ProveedorCursosService, private auth: AuthService) {}

  ngOnInit(): void{
      this.auth.isAuthenticated();
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async enviarFormulario(form: crearAsignatura) {

    this.api.crearAsignatura(form).subscribe(
      (response: any) => {
        const datos: Cursos = {
          mensaje: response.message,
          cursos:{
            id: response.data.id,
            nombre: response.data.nombre,
            sigla: response.data.sigla,
            institucion: response.data.institucion,
            descripcion: response.data.descripcion,
          }
      };
    
      if(datos.mensaje === 'Curso creado exitosamente'){
        this.presentAlert('Éxito','Asignatura creada con éxito');
      } else {
        this.presentAlert('Error','Error al crear asignatura');
      }
    }
  );
}
}


