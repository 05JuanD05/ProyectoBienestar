import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  // Guarda el objeto Usuario en la sesión
  setUser(user: Usuario): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Obtiene el objeto Usuario de la sesión
  getUser(): Usuario{
    const userStr = sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Elimina el objeto Usuario de la sesión
  clearSession(): void {
    sessionStorage.removeItem('user');
  }
}
