import { Component } from '@angular/core';
import { RecuperarService } from './recuperar.service'; // Ajusta la ruta según sea necesario
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  correo: string = '';

  constructor(private recuperarService: RecuperarService, private alertController: AlertController) {}

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  recuperar() {
    if (this.correo.length >= 10) {
      this.recuperarService.recuperarContraseña(this.correo).subscribe(
        response => {
          this.mostrarAlerta('Éxito', response.message); // Usa el mensaje de la respuesta
        },
        error => {
          console.error('Error al enviar el correo', error);
          
          let mensajeError = 'No se pudo enviar el correo, por favor intenta nuevamente.';
          if (error.error && error.error.message) {
            mensajeError = error.error.message; // Usa el mensaje de error de la respuesta
          }
          this.mostrarAlerta('Error', mensajeError);
        }
      );
    } else {
      console.log('Correo inválido');
      this.mostrarAlerta('Error', 'Correo inválido');
    }
  }
}
