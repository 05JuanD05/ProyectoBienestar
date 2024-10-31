import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desvinculacion',
  templateUrl: './desvinculacion.component.html',
  styleUrls: ['./desvinculacion.component.scss']
})
export class DesvinculacionComponent implements OnInit {

  solicitudes = [
    { id: 1, nombre: 'Juan Pérez', actividad: 'Fútbol', motivo: 'Razones personales' },
    { id: 2, nombre: 'María López', actividad: 'Natación', motivo: 'Incompatibilidad de horarios' },
    { id: 3, nombre: 'Carlos Gómez', actividad: 'Baloncesto', motivo: 'Problemas de salud' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  aceptarSolicitud(id: number) {
    console.log('Solicitud aceptada con ID:', id);
    this.solicitudes = this.solicitudes.filter(solicitud => solicitud.id !== id);
  }

  rechazarSolicitud(id: number) {
    console.log('Solicitud rechazada con ID:', id);
    this.solicitudes = this.solicitudes.filter(solicitud => solicitud.id !== id);
  }

}
