import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinador } from '../modelo/Coordinador';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {
  private apiUrlUsuario = 'http://localhost:3000/usuario';
  private apiUrlCoordinador = 'http://localhost:3000/coordinador';

  coordiandores: Coordinador[] = [];


  constructor(private http: HttpClient) { }


  createUsuario(coordinador: Coordinador): Observable<any>  {
    let usuario:Usuario=coordinador;
    return this.http.post(this.apiUrlUsuario, usuario);  
  }
  createCoordinador(coordinador: Coordinador): Observable<any>  {   
    let dcoordinador:String[] = [coordinador.id.toString(),coordinador.area.id.toString()];
    return this.http.post(this.apiUrlCoordinador, dcoordinador);   
  }

  obtenerCoordinadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlCoordinador);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuario);
  }


}
