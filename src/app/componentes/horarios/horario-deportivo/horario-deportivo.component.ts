<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';
=======
import { Component } from '@angular/core';
>>>>>>> Horarios
import { Actividad } from 'src/app/modelo/Actividad';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { Inscripcion } from 'src/app/modelo/Inscripcion';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Usuario } from 'src/app/modelo/Usuario';
import { SessionService } from 'src/app/servicios/session.service';
<<<<<<< HEAD
=======

>>>>>>> Horarios
@Component({
  selector: 'app-horario-deportivo',
  templateUrl: './horario-deportivo.component.html',
  styleUrls: ['./horario-deportivo.component.scss']
})
export class HorarioDeportivoComponent {

  public actividades: Actividad[] = this.acti.actividades;
<<<<<<< HEAD
  public insc:Inscripcion | undefined;
  public a: Actividad | undefined;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  

  constructor(private acti: ActividadService,private inscripcion: InscripcionService,private sesSer: SessionService) {
    
  }

  ngOnInit() {
    this.listarActividades();
    this.usuario=this.sesSer.getUser();
=======
  public insc: Inscripcion | undefined;
  public a: Actividad | undefined;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");

  constructor(
    private acti: ActividadService,
    private inscripcion: InscripcionService,
    private sesSer: SessionService
  ) { }

  ngOnInit() {
    this.listarActividades();
    this.usuario = this.sesSer.getUser();
>>>>>>> Horarios
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
<<<<<<< HEAD
      }
    )
  }
/*
  agregar(id:number):void {
    const id_ : number = 0;
     
    this.a = this.actividades.find(objeto => objeto.id=== id);
   
    console.log('click',this.a);


    
    this.inscripcion.createInscripcion(this.insc).subscribe(
      (response) => {
        console.log('Actividad agregada: ', response);
        
        this.insc= new Inscripcion (id_ + 1,"",new Date()
        ,new Usuario(0, "", "", "", "", "", "", "", "", ""),this.a) ;
      }
    )

  }
*/
  agregar(idA: number): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear la inscripción?');
    //const entero :number= 1+ Number(idA);
    const entero :number= 1;
    
    if(confirmacion){

    this.a = this.actividades.find(objeto => objeto.id === idA);
    console.log('click', this.a);
  
    if (this.a) {
      this.insc = new Inscripcion(entero, "Estudiante", new Date(), this.usuario.id, idA);
  
      this.inscripcion.createInscripcion(this.insc).subscribe(
        (response) => {
          console.log('Actividad agregada: ', response);
        },
        (error) => {
          console.error('Error al agregar la actividad: ', error);
        }
      );
    } else {
      console.error('Actividad no encontrada con id: ', idA);
    }
    console.log("se hizo la inscripcion");
  }else{
    console.log("no se hizo la inscripcion");
  }
}



}

=======
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
        // Verificar si el usuario ya está inscrito en la actividad actual
        const yaInscrito = inscripciones.some(inscripcion =>
          inscripcion.usuario === this.usuario.id && inscripcion.actividad_id === idA
        );

        if (yaInscrito) {
          // Mostrar aviso de que ya está inscrito
          alert("Ya estás inscrito en esta actividad.");
          return; // Salir de la función si ya está inscrito
        }

        // Si no está inscrito, continuar con la inscripción
        const confirmacion = window.confirm('¿Estás seguro de que deseas crear la inscripción?');
        
        if (confirmacion) {
          this.a = this.actividades.find(objeto => objeto.id === idA);
          if (this.a) {
            const nuevaInscripcion = new Inscripcion(0, "Estudiante", new Date(), this.usuario.id, idA);
            this.inscripcion.createInscripcion(nuevaInscripcion).subscribe(
              (response) => {
                console.log('Actividad agregada: ', response);
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
>>>>>>> Horarios
