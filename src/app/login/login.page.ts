import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AlertController } from '@ionic/angular';

import { ProveedorCursosService } from '../providers/proveedor-cursos.service';
import { Login } from '../models/login';
import { Responsive } from '../models/responsive';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  public correo: string = '';
  public password: string = '';
  public usuario: any;

  constructor(private alertController: AlertController, private api: ProveedorCursosService, private router: Router, private auth: AuthService) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async ngOnInit() {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }


  async login(form: Login) {
    if (await this.auth.isAuthenticated()) {
      this.auth.logout();
    }
    this.api.loginPorCorreo(form).subscribe(
      (response: any) => {
        const datos: Responsive = {
          mensaje: response.message,
          perfil: response.perfil,
          autenticacion: {
            token: response.auth.token,
            type: response.auth.type,
          },
          data: {
            id: response.data.id,
            run: response.data.run,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            nombre_completo: response.data.nombre_completo,
            correo: response.data.correo,
            perfil: response.data.perfil,
            img: response.data.img,
          },
        };
        console.log(datos.autenticacion.token);
        console.log(datos.mensaje === 'Success');


      if(datos.mensaje === 'Success'){
        this.auth.setToken(datos.autenticacion.token);
        this.auth.setPerfil(datos.data.perfil);
        this.auth.setNombre(datos.data.nombre_completo);

        this.usuario = datos.data.nombre_completo;
        this.presentAlert('Bienvenido', `Hola, ${this.usuario}`);
        this.router.navigate(['/home']);
      } else{
        this.presentAlert('Error', 'Usuario o contraseña incorrecta');
      }
    },
    (error) => {
      console.log(error);
    }
  );
}}