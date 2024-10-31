import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrlUsuario = 'http://localhost:3000/usuario';
  usuarios: Usuario[] = [];


  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuario);
  }

  iniciar(log:String,pass:String): Observable<any> {
    const url = `${this.apiUrlUsuario}?login=${log}&password=${pass}`;
    return this.http.get<any>(url);
  }

  



}
