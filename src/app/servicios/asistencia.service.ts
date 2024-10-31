import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from '../modelo/Asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  
  asistencia: Asistencia[] = [];
  private apiUrlAsistencia = 'http://localhost:3000/asistencia';
  
  constructor(private http: HttpClient) { }

  
  createAsistencia(asistencia: Asistencia): Observable<any>  {
    return this.http.post(this.apiUrlAsistencia, asistencia);
  }

  obtenerAsistencia(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAsistencia);
  }

  eliminarAsistencia(id: number): Observable<void> {
    const url = `${this.apiUrlAsistencia}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarAsistencia(id: number): Observable<any> {
    const url = `${this.apiUrlAsistencia}/${id}`;
    return this.http.get(url);
  }


  actualizarAsistencia(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlAsistencia}/${id}`;
    return this.http.put(url, datosActualizados);
  }



}
