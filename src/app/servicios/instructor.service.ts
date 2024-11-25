import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../modelo/Usuario';
import { Instructor } from '../modelo/Instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrlUsuario = 'http://localhost:3000/usuario';
  private apiUrlInstructor = 'http://localhost:3000/instructor';

  constructor(private http: HttpClient) { }

  createUsuario(usuario: Usuario): Observable<Usuario>  {    
    return this.http.post<Usuario>(this.apiUrlUsuario, usuario);  
  }

  createInstructor(instructor: Instructor): Observable<Instructor>  {   
     return this.http.post<Instructor>(this.apiUrlInstructor, instructor);   
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrlUsuario);
  }

  obtenerInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrlInstructor);
  }


  eliminarInstructor(id: number): Observable<any>{
    const url = `${this.apiUrlInstructor}/${id}`;
    return this.http.delete<void>(url);
  }

  eliminarUsuario(id: number): Observable<any>{
    const url = `${this.apiUrlUsuario}/${id}`;
    return this.http.delete<void>(url);
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrlUsuario}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  actualizarInstructor(id: number, instruActu: any): Observable<any> {
    const url = `${this.apiUrlInstructor}/${id}`;
    return this.http.put<Instructor>(url, instruActu);
  }
}
