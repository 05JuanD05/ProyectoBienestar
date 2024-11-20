import { Injectable } from '@angular/core';
import { Instructor } from '../modelo/Instructor';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiURL = 'http://localhost:3000';
  private apiUrlUsuario = `${this.apiURL}/usuario`;
  private apiUrlInstructor = `${this.apiURL}/instructor`;

  instructores: Instructor[] = [];


  constructor(private http: HttpClient) { }

  eliminarInstructor(id: number): Observable<any>{
    const url = `${this.apiUrlInstructor}/${id}`;
    return this.http.delete<void>(url);
  }

  eliminarUsuario(id: number): Observable<any>{
    const url = `${this.apiUrlUsuario}/${id}`;
    return this.http.delete<void>(url);
  }

  createUsuario(usuario: Usuario): Observable<any>  {    
    return this.http.post(this.apiUrlUsuario, usuario);  
  }

  createInstructor(instructor: Instructor): Observable<any>  {   
     return this.http.post(this.apiUrlInstructor, instructor);   
  }

  obtenerInstructores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlInstructor);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrlUsuario).pipe(
      catchError(error => {
        console.error('Error al obtener los usuarios: ', error);
        return throwError(error);
      })
    );
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrlUsuario}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  actualizarInstructor(instructor: Instructor): Observable<Instructor> {
    const url = `${this.apiUrlInstructor}/${instructor.id}`;
    return this.http.put<Instructor>(url, instructor);
  }
}
