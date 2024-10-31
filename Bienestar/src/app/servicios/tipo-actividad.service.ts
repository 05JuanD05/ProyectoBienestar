import { Injectable } from '@angular/core';
import { TipoActividad } from '../modelo/TipoActividad';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoActividadService {

  tipos: TipoActividad[] = [];
  private apiUrlTipoActividad = 'http://localhost:3000/tipoactividad';

  constructor(private http: HttpClient) { }

  
  createTipoActividad(tipoactividad: TipoActividad): Observable<any>  {
    return this.http.post(this.apiUrlTipoActividad, tipoactividad);
   // this.areas.push(area);
  }

  obtenerTiposActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTipoActividad);
  }

  eliminarATipoActividad(id: number): Observable<void> {
    const url = `${this.apiUrlTipoActividad}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarTipoActividad(id: number): Observable<any> {
    const url = `${this.apiUrlTipoActividad}/${id}`;
    return this.http.get(url);
  }

  actualizarTipoActividad(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlTipoActividad}/${id}`;
    return this.http.put(url, datosActualizados);
  }

}
