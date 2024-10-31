import { Injectable } from '@angular/core';
import { Escenario } from '../modelo/Escenario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {
  escenarios: Escenario[] = [];
  private apiUrlEscenario = 'http://localhost:3000/escenario';

  constructor(private http: HttpClient) { }

  createEscenario(escenario: Escenario): Observable<any>  {
    return this.http.post(this.apiUrlEscenario, escenario);
  }

  obtenerEscenarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlEscenario);
  }

  eliminarEscenario(id: number): Observable<void> {
    const url = `${this.apiUrlEscenario}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarEscenario(id: number): Observable<any> {
    const url = `${this.apiUrlEscenario}/${id}`;
    return this.http.get(url);
  }

  actualizarEscenario(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrlEscenario}/${id}`;
    return this.http.put(url, datosActualizados);
  }

  setEsce(esce: Escenario): void {
    sessionStorage.setItem('esce', JSON.stringify(esce));
  }

  getEsce(): Escenario{
    const esceStr = sessionStorage.getItem('esce');
    return esceStr ? JSON.parse(esceStr) : null;
  }

  removeEsce(): void {
    sessionStorage.removeItem('esce');
  }

}