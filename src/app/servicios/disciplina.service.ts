import { Injectable } from '@angular/core';
import { Disciplina } from '../modelo/Disciplina';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  disciplinas: Disciplina[] = [];
  private apiUrldisciplina = 'http://localhost:3000/disciplina';

  constructor(private http: HttpClient) { }

  
  createDisciplina(disciplina: Disciplina): Observable<any>  {
    return this.http.post(this.apiUrldisciplina, disciplina);
   // this.areas.push(area);
  }

  obtenerDisciplinas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrldisciplina);
  }

  eliminarDisciplina(id: number): Observable<void> {
    const url = `${this.apiUrldisciplina}/${id}`;
    return this.http.delete<void>(url);
  }

  consultarDisciplina(id: number): Observable<any> {
    const url = `${this.apiUrldisciplina}/${id}`;
    return this.http.get(url);
  }

  actualizarDisciplina(id: number, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrldisciplina}/${id}`;
    return this.http.put(url, datosActualizados);
  }
}
