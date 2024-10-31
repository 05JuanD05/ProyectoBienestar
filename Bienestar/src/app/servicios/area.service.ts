import { Injectable } from '@angular/core';
import { Area } from '../modelo/Area';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  areas: Area[] = [];
  private apiUrlArea = 'http://localhost:3000/area';

  constructor(private http: HttpClient) { }

  
  createArea(area: Area): Observable<any>  {
    return this.http.post(this.apiUrlArea, area);
   // this.areas.push(area);
  }

  obtenerAreas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlArea);
  }

  eliminarArea(id: number): Observable<void> {
    const url = `${this.apiUrlArea}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarArea(id: number): Observable<any> {
    const url = `${this.apiUrlArea}/${id}`;
    return this.http.get(url);
  }

  actualizarArea(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlArea}/${id}`;
    return this.http.put(url, datosActualizados);
  }

}
