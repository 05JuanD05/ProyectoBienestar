import { Component } from '@angular/core';
import { Actividad } from 'src/app/modelo/Actividad';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { Inscripcion } from 'src/app/modelo/Inscripcion';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Usuario } from 'src/app/modelo/Usuario';
import { SessionService } from 'src/app/servicios/session.service';
@Component({
  selector: 'app-horario-deportivo',
  templateUrl: './horario-deportivo.component.html',
  styleUrls: ['./horario-deportivo.component.scss']
})
export class HorarioDeportivoComponent {

  public actividades: Actividad[] = this.acti.actividades;
  public insc: Inscripcion | undefined;
  public a: Actividad | undefined;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "");

  constructor(
    private acti: ActividadService,
    private inscripcion: InscripcionService,
    private sesSer: SessionService
  ) { }

  ngOnInit() {
    this.listarActividades();
    this.usuario = this.sesSer.getUser();
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
      },
      (error) => {
        console.error('Error al obtener actividades: ', error);
      }
    );
  }
  agregar(idA: number): void {
    // Verificar si el usuario ya está inscrito en la actividad
    this.inscripcion.obtenerInscripcion().subscribe(
      (inscripciones: Inscripcion[]) => {
        const yaInscrito = inscripciones.some(inscripcion =>
          inscripcion.usuario === this.usuario.id && inscripcion.actividad_id === idA
        );
  
        if (yaInscrito) {
          alert("Ya estás inscrito en esta actividad.");
          return;
        }
  
        const confirmacion = window.confirm('¿Estás seguro de que deseas crear la inscripción?');
        
        if (confirmacion) {
          this.a = this.actividades.find(objeto => objeto.id === idA);
          if (this.a) {
            // Generamos el id basado en el tamaño del array de inscripciones
            const nuevaInscripcion = new Inscripcion(
              inscripciones.length + 1, // Asignamos un id único basado en la longitud actual
              "Estudiante",
              new Date(),
              this.usuario.id,
              idA,
              "activo"
            );
            
            // Crear la inscripción
            this.inscripcion.createInscripcion(nuevaInscripcion).subscribe(
              (response) => {
                console.log('Actividad agregada: ', response);
                this.listarActividades();  // Actualizamos el listado de actividades
              },
              (error) => {
                console.error('Error al agregar la actividad: ', error);
              }
            );
          } else {
            console.error('Actividad no encontrada con id: ', idA);
          }
        } else {
          console.log("Inscripción cancelada.");
        }
      },
      (error) => {
        console.error('Error al obtener inscripciones: ', error);
      }
    );
  }
}  
