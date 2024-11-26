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

  
  createInscripcion(actividad_inscrita: Inscripcion): Observable<any> {
    // Se elimina el id antes de realizar la petición
    const { id, ...inscripcionSinId } = actividad_inscrita;
    return this.http.post(this.apiUrlInscripcion, inscripcionSinId);
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

    actualizarInscripcion(id: number, cambios: Partial<Inscripcion>): Observable<any> {
      return this.http.patch(`${this.apiUrlInscripcion}/${id}`, cambios); // PATCH para actualizar campos específicos
    }
    

  
  obtenerActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlActividad);
  }

}