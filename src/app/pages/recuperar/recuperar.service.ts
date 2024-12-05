import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperarService {
  private apiUrl = 'https://www.presenteprofe.cl/api/v1/auth/recuperar';

  constructor(private http: HttpClient) {}

  recuperarContraseña(correo: string): Observable<any> {
    return this.http.post(this.apiUrl, { correo: correo }); // Cambiado a "correo"
  }
}
