import { Injectable } from '@angular/core';
import { Actividad } from '../modelo/Actividad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  
  actividades: Actividad[] = [];
  private apiUrlActividad = 'http://localhost:3000/actividad';
  
  constructor(private http: HttpClient) { }

  
  createActividad(actividad: Actividad): Observable<any>  {
    return this.http.post(this.apiUrlActividad, actividad);
  }

  obtenerActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlActividad);
  }

  eliminarActividad(id: number): Observable<void> {
    const url = `${this.apiUrlActividad}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarActividad(id: number): Observable<any> {
    const url = `${this.apiUrlActividad}/${id}`;
    return this.http.get(url);
  }

  /* consultarActividadPorTipo(tipoActividadId: number): Observable<Actividad[]> {
    const url = `${this.apiUrlActividad}/?tipoActividad_id=${tipoActividadId}`;
    return this.http.get<Actividad[]>(url);
  } */

  actualizarActividad(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlActividad}/${id}`;
    return this.http.put(url, datosActualizados);
  }



}
