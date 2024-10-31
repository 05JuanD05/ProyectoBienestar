import { Component, EventEmitter, Output } from '@angular/core';
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
  public insc:Inscripcion | undefined;
  public a: Actividad | undefined;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  

  constructor(private acti: ActividadService,private inscripcion: InscripcionService,private sesSer: SessionService) {
    
  }

  ngOnInit() {
    this.listarActividades();
    this.usuario=this.sesSer.getUser();
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
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

