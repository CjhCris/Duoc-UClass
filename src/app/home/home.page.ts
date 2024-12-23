import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuario: any;
  public perfil: any;
  public currentTheme: 'light' | 'dark' = 'light';

  constructor(
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router
  ) {
    this.usuario = '';
    this.perfil = '';
  }

  async ngOnInit() {
    // Cargar datos del usuario
    this.usuario = await this.auth.getNombre();
    this.perfil = await this.auth.getPerfil();

    // Verifica si hay un tema guardado y aplícalo
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    this.currentTheme = savedTheme || 'light';
    document.body.setAttribute('color-theme', this.currentTheme);
  }

  async presentConfirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          },
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            await this.auth.logout();
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  async cerrarSesion() {
    await this.presentConfirmLogout();
  }

  // Alternar entre light y dark mode
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('color-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
