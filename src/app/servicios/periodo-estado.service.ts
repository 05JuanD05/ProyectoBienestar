import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Periodo } from '../modelo/Periodo';


@Injectable({
  providedIn: 'root'
})
export class PeriodoEstadoService {
  // Subject para mantener el estado del periodo activo
  private periodoActivoSubject = new BehaviorSubject<Periodo | null>(null);
  
  // Observable para que otros componentes se suscriban
  public periodoActivo$ = this.periodoActivoSubject.asObservable();

  // Método para establecer el periodo activo
  setPeriodoActivo(periodo: Periodo): void {
    this.periodoActivoSubject.next(periodo);
  }
}
