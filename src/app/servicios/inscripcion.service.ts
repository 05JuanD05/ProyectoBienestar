import { Injectable } from '@angular/core';
import { Actividad } from '../modelo/Actividad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../modelo/Inscripcion';


@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  inscripcion:Inscripcion[] = [];
  private apiUrlInscripcion = 'http://localhost:3000/inscripcion';
  
  actividades: Actividad[] = [];
  private apiUrlActividad = 'http://localhost:3000/actividad';

  constructor(private http: HttpClient) { }

  
  createInscripcion(actividad_inscrita:Inscripcion): Observable<any>  {
    return this.http.post(this.apiUrlInscripcion, actividad_inscrita);
  }
  
  obtenerInscripcion(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlInscripcion);
  }

  eliminarInscripcion(id: number): Observable<void> {
    const url = `${this.apiUrlInscripcion}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarInscripcion(id: number): Observable<any> {
    const url = `${this.apiUrlInscripcion}/${id}`;
    return this.http.get(url);
  }

  /* consultarActividadPorTipo(tipoActividadId: number): Observable<Actividad[]> {
    const url = `${this.apiUrlActividad}/?tipoActividad_id=${tipoActividadId}`;
    return this.http.get<Actividad[]>(url);
  } */

  actualizarInscripcion(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlInscripcion}/${id}`;
    return this.http.put(url, datosActualizados);
  }

  
  obtenerActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlActividad);
  }

}