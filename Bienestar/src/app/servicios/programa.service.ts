import { Injectable } from "@angular/core";
import { Programa } from "../modelo/Programa";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProgramaService {

    programas: Programa[] = [];
    private apiUrlPrograma = 'http://localhost:3000/programa'

    constructor(private http: HttpClient) { }


    createPrograma(programa: Programa): Observable<any> {
        return this.http.post(this.apiUrlPrograma, programa);
    }

    obtenerProgramas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrlPrograma);
    }

    eliminarPrograma(id: number): Observable<void> {
        const url = `${this.apiUrlPrograma}/${id}`;
        return this.http.delete<void>(url);
    }

    consultarPrograma(id: number): Observable<any> {
        const url = `${this.apiUrlPrograma}/${id}`;
        return this.http.get(url);
    }

    actualizarPrograma(id: number, datosActualizados: any): Observable<any> {
        const url = `${this.apiUrlPrograma}/${id}`;
        return this.http.put(url, datosActualizados);
    }
}