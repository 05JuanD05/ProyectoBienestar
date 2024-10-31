import { Injectable } from '@angular/core';
import { Instructor } from '../modelo/Instructor';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrlUsuario = 'http://localhost:3000/usuario';
  private apiUrlInstructor = 'http://localhost:3000/instructor';

  instructores: Instructor[] = [];


  constructor(private http: HttpClient) { }

  eliminarInstructor(id: number): Observable<void>{
    const url = `${this.apiUrlInstructor}/${id}`;
    return this.http.delete<void>(url);
  }

  eliminarUsuario(id: number): Observable<void>{
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

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuario);
  }

}
