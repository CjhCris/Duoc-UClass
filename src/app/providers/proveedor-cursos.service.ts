import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos';
import { Login} from '../models/login';
import { Responsive } from '../models/responsive';
import { ClaseResponse, CrearClase } from '../models/clase';

@Injectable({
  providedIn: 'root',
})
export class ProveedorCursosService {
  private url = 'https://www.presenteprofe.cl/api/v1/';

  constructor(private http: HttpClient) {}
  obtenerDatos(): Observable<any> {
    return this.http.get<any>('${this.url}/auth'); 
  }

  obtenerCursosEstudiante(): Observable<Curso[]> {
    let url = this.url + 'estudiante/cursos';
    return this.http.get<any>(url);
  }

  obtenerCursosProfesor(): Observable<any> {
    let url = this.url + 'cursos';
    return this.http.get<any>(url);
  }
  

  loginPorCorreo(form:Login){
    let url = this.url + 'auth';
    return this.http.post<any>(url, form);
  }

  recuperarContrsena(correo: string): Observable<any> {
    let url = this.url + 'recuperar';
    return this.http.post(url, {correo});
  }

  obtenerMisDatos(): Observable<any> {
    let url = this.url + 'auth/me';
    return this.http.get(url);
  }

  crearAsignatura(form: any): Observable<any> {
    let url = this.url + 'cursos';
    return this.http.post(url, form);
  }

  crearClase(idCurso: number, form: CrearClase): Observable<ClaseResponse> {
    const url = `${this.url}cursos/${idCurso}/clase`;
    return this.http.post<ClaseResponse>(url, form);
  }
  
  registrarAsistencia(eventCode: string): Observable<any> {
    let url = this.url + 'clases/' + eventCode + '/asistencia';
    return this.http.post(url, { evento: eventCode });
  }

  obtenerAsistenciaAlumno(idCurso: number): Observable<any> {
    let url = this.url + 'cursos/' + idCurso;
    return this.http.get(url);
  }
}
