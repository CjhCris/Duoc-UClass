import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  
  public registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {
    this.registroForm = this.fb.group({
      run: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      perfil: ['', [Validators.required]], // Asegúrate de que este campo esté presente y sea obligatorio
      codigo: ['presenteprofe', [Validators.required]],
    });
  }

  async registrarUsuario(): Promise<void> {
    const formData = this.registroForm.value;

    try {
      const response = await this.http
        .post('https://www.presenteprofe.cl/api/v1/usuarios', formData)
        .toPromise();

      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'El usuario ha sido registrado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Resetear el formulario
      this.registroForm.reset();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo registrar el usuario. Inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
