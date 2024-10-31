import { Injectable } from '@angular/core';
import { Periodo } from '../modelo/Periodo';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private semestreActual = new BehaviorSubject<Periodo | null>(null); // BehaviorSubject para el periodo activo
  semestrePeriodo: Periodo[] = [];
  private UrlApi = 'http://localhost:3000/periodo';

  constructor(private httpClient: HttpClient) {}

  obtenerSemestre(): Observable<Periodo[]> {
    return this.httpClient.get<Periodo[]>(this.UrlApi);
  }

  crearSemestre(actividad: Periodo): Observable<any> {
    return this.httpClient.post(this.UrlApi, actividad);
  }

  cambiarEstadoSemestre(id: number, estado: boolean): Observable<any> {
    return this.httpClient.patch(`${this.UrlApi}/${id}`, { actual: estado });
  }

  // Método para establecer el periodo activo
  setPeriodoActivo(periodo: Periodo): void {
    this.semestreActual.next(periodo);
  }

  // Método para obtener el periodo activo como observable
  get periodoActivo$(): Observable<Periodo | null> {
    return this.semestreActual.asObservable();
  }
}
