import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { Asistencia } from '../models/asistencia';
import { ProveedorCursosService } from '../providers/proveedor-cursos.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  resultadoScan = '';

  constructor(
    private modalControler: ModalController,
    private platform: Platform,
    private router: Router,
    private api: ProveedorCursosService
  ) { }

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      // Verificar si la funcionalidad de escaneo de código de barras está soportada
      BarcodeScanner.isSupported().then((result) => {
        if (result) {
          BarcodeScanner.checkPermissions().then(() => {
            BarcodeScanner.removeAllListeners();
            this.empezarScan();
          });
        } else {
          alert('Escaneo de código de barras no soportado en este dispositivo');
        }
      });
    }
  }

  async empezarScan() {
    // Crear el modal para el escaneo de código de barras
    const modal = await this.modalControler.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: { 
        formats: [], // Aquí puedes especificar los formatos que deseas permitir
        lensFacing: 'back' // Cámara trasera para el escaneo
      }
    });
  
    // Mostrar el modal
    await modal.present();
  
    // Esperar el resultado del escaneo cuando el modal se cierre
    const { data } = await modal.onWillDismiss();

    // Verificar si se escaneó un código
    if (data && data.barcode) {
      this.resultadoScan = data.barcode.displayValue;
      console.log('Código del evento:', this.resultadoScan);

      // Registrar la asistencia
      this.registrarAsistencia(this.resultadoScan);

      // Redirigir al usuario a la página de inicio
      this.router.navigate(['/home']);
    } else {
      // Si el QR es inválido o no corresponde a un evento
      alert('QR inválido o no corresponde a un evento');
    }
  }

  registrarAsistencia(eventCode: string) {
    console.log('Registrando asistencia para el evento:', eventCode);
    this.api.registrarAsistencia(eventCode).subscribe(
      (response: any) => {
        const datos: Asistencia = {
          mensaje: response.message,
        };
        alert(datos.mensaje);
      },
      (error) => {
        console.error('Error al registrar la asistencia', error);
        alert('Hubo un error al registrar la asistencia');
      }
    );
  }

}
