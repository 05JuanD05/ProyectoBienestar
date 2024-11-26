import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { Actividad } from 'src/app/modelo/Actividad';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Inscripcion } from 'src/app/modelo/Inscripcion';

@Component({
  selector: 'app-solicitudes-eliminacion',
  templateUrl: './solicitudes-eliminacion.component.html',
  styleUrls: ['./solicitudes-eliminacion.component.scss']
})
export class SolicitudesEliminacionComponent implements OnInit {
  solicitudes: Inscripcion[] = [];  // Aquí almacenaremos las solicitudes pendientes de eliminación

  constructor(private inscripcionService: InscripcionService) { }

  ngOnInit(): void {
    this.cargarSolicitudes();  // Cargar las solicitudes de eliminación cuando el componente se inicialice
  }

  cargarSolicitudes(): void {
    // Cargar todas las inscripciones con estado "En proceso de eliminación"
    this.inscripcionService.obtenerInscripcion().subscribe(inscripciones => {
      this.solicitudes = inscripciones.filter(insc => insc.estado === 'En proceso de eliminación');
    });
  }

 
  // Aceptar solicitud (Elimina definitivamente)
  aceptarSolicitud(id: number) {
    this.inscripcionService.eliminarInscripcion(id).subscribe(
      () => {
        // Eliminar la solicitud de la lista local
        this.solicitudes = this.solicitudes.filter((inscripcion) => inscripcion.id !== id);
        console.log(`Solicitud con ID ${id} aceptada y eliminada.`);
      },
      (error) => console.error('Error al aceptar solicitud:', error)
    );
  }

  // Rechazar solicitud (Devuelve el estado a "activo")
  rechazarSolicitud(id: number) {
    const cambios = { estado: 'activo' };
    this.inscripcionService.actualizarInscripcion(id, cambios).subscribe(
      () => {
        // Eliminar la solicitud de la lista local
        this.solicitudes = this.solicitudes.filter((inscripcion) => inscripcion.id !== id);
        console.log(`Solicitud con ID ${id} rechazada y estado actualizado a 'activo'.`);
      },
      (error) => console.error('Error al rechazar solicitud:', error)
    );
  }
}