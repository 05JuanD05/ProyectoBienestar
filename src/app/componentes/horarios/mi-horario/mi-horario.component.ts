import { Component } from '@angular/core';
import { Actividad } from 'src/app/modelo/Actividad';
import { Inscripcion } from 'src/app/modelo/Inscripcion';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Usuario } from 'src/app/modelo/Usuario';
import { SessionService } from 'src/app/servicios/session.service'; 
@Component({
  selector: 'app-mi-horario',
  templateUrl: './mi-horario.component.html',
  styleUrls: ['./mi-horario.component.scss']

})
export class MiHorarioComponent {

  public actividades: Actividad[] = this.acti.actividades;

  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");

  public MisIncripciones: Inscripcion[] = this.inscripcion.inscripcion;

  constructor(private acti: ActividadService, private inscripcion: InscripcionService,private sesSer: SessionService) {
      
}

ngOnInit() {
  this.listarActividades();
  this.listarIncripciones();
  this.usuario=this.sesSer.getUser();  
}



listarActividades() {
  this.acti.obtenerActividades().subscribe((data) => {
    // Filtramos para mostrar solo actividades "Activas" o "En proceso de eliminación"
    this.actividades = data.filter(actividad => 
      actividad.estado === 'Activo' || actividad.estado === 'En proceso de eliminación'
    );
  });
}

  listarIncripciones() {
    this.inscripcion.obtenerInscripcion().subscribe(
      (data) => {
        console.log(data);
        this.MisIncripciones = data;
      }
    );
  }

  solicitarEliminacion(inscripcionId: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas solicitar la eliminación de esta inscripción?');
    
    if (confirmacion) {
      const nuevoEstado = 'En proceso de eliminación'; // Nuevo estado
    
      // Actualizar el estado en el servidor
      this.inscripcion.actualizarInscripcion(inscripcionId, { estado: nuevoEstado }).subscribe(
        (response) => {
          console.log('Inscripción actualizada en el servidor', response);
    
          // Encontrar la inscripción localmente y actualizar solo el estado
          const inscripcion = this.MisIncripciones.find((insc) => insc.id === inscripcionId);
          if (inscripcion) {
            inscripcion.estado = nuevoEstado; // Actualizar solo el estado
          }
    
          console.log('Estado actualizado correctamente.');
        },
        (error) => {
          console.error('Error al actualizar el estado:', error);
        }
      );
    } else {
      console.log('El usuario canceló la solicitud de eliminación.');
    }
  }
  
  
}