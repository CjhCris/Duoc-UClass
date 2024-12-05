import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-qr-modal',
    template: `
    <ion-header>
        <ion-toolbar>
        <ion-title>QR</ion-title>
        <ion-buttons slot="end">
            <ion-button (click)="confirmClose()">Cerrar</ion-button>
        </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <div class="qr-container">
        <div class="qr">
            <qr-code
            [value]="codigoClase"
            size="300"
            errorCorrectionLevel="M"
            ></qr-code>
            <div class="qr-text">
            <h3>{{ codigoClase }}</h3>
            </div>
        </div>
        </div>
    </ion-content>
    `,
    styles: [
    `
        ion-content {
        --background: var(--ion-background-color);
        }
        .qr-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        }
        .qr-text {
        text-align: center;
        margin-top: 10px;
        }
    `,
    ],
})
export class GenerarQrModalComponent implements OnInit {
    @Input() codigoClase: string = '';
    presentingElement: Element | null = null;

    constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController
    ) {}

    ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
    console.log('Código QR:', this.codigoClase);
    }

    async confirmClose() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: '¿Está seguro?',
        buttons: [
        {
            text: 'Sí',
            role: 'confirm',
            handler: async () => {
            // Cierra el modal si el usuario confirma
            await this.modalController.dismiss();
            },
        },
        {
            text: 'No',
            role: 'cancel',
        },
        ],
    });

    await actionSheet.present();
    }
}
