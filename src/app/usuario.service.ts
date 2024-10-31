import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    constructor(private http: HttpClient) {}

    getUsuario(): Observable<any> {
        return this.http.get('/api/usuario'); 
    }
}
