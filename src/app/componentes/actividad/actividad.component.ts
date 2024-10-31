import { Component, OnInit, Inject } from '@angular/core';
import { Actividad } from 'src/app/modelo/Actividad';
import { Coordinador } from 'src/app/modelo/Coordinador';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { Escenario } from 'src/app/modelo/Escenario';
import { Instructor } from 'src/app/modelo/Instructor';
import { TipoActividad } from 'src/app/modelo/TipoActividad';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { EscenarioService } from 'src/app/servicios/escenario.service';
import { TipoActividadService } from 'src/app/servicios/tipo-actividad.service';
import { Periodo } from 'src/app/modelo/Periodo';
import { Usuario } from 'src/app/modelo/Usuario';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { response } from 'express';
import { SessionService } from 'src/app/servicios/session.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  public usuarios: Usuario[] = [];

  public actividad: Actividad = new Actividad(
    0,
    " ",
    " ",
    " ",
    new Date(), //hora inicial
    new Date(), //hora final
    new Date(), //fecha de creacion
    new Date(), //fechaPublicacion
    new Date(), //fechaInicioInscripcion
    new Date(), //fechafinalInscripcion
    0,
    0,
    0,
    0,
    0
  );
  public actividades: Actividad[] = this.acti.actividades;

  public instructor: Instructor = new Instructor("", new Disciplina(0, "", "",""), 0);
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  public tipo: TipoActividad = new TipoActividad(0,"", "", "");
  public escenario: Escenario = new Escenario(0, "", "", "", "", "","");
  public escenarios: Escenario[] = [];
  public disciplinas: Disciplina[] = [];
  public coordinadores: Coordinador[] = [];
  public instructores: Instructor[] = [];
  public tipoActividades: TipoActividad [] = [];
  public tipos: TipoActividad[] = this.tipaser.tipos;

  constructor(private acti: ActividadService, private instser: InstructorService, private escenar: EscenarioService, private tipaser: TipoActividadService, private sesSer: SessionService ) { }
 
  ngOnInit() {
    this.usuario=this.sesSer.getUser()
    this.listarActividades();
    this.listarUsuarios();
    this.listarEscenarios();
    this.listarTiposActividad();
    
  }

  seleccionarInstructor(inst: Usuario) {
    this.usuario = inst;
    this.actividad.instructor_id = this.usuario.id;
  }

  seleccionarTipoActividad(tipo: TipoActividad) {
    this.tipo = tipo;
    this.actividad.tipoActividad_id = this.tipo.id;
  }

  seleccionarEscenario(esce: Escenario) {
    this.escenario = esce;
    this.actividad.escenario_id = this.escenario.id;
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
      }
    )
  }

  listarUsuarios() {
    this.instser.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      }
    );
  }

  listarEscenarios() {
    this.escenar.obtenerEscenarios().subscribe(
      (data) => {
        this.escenarios = data;
      }
    );
  }

  listarTiposActividad() {
    this.tipaser.obtenerTiposActividades().subscribe(
      (data) => {
        this.tipos = data;
      }
    );
  }

  

/*   determinarPeriodo(hora: Date): string {

    let fecha: Date = new Date(hora);

    let horas: number = fecha.getHours();
    let minutos: number = fecha.getMinutes();

    if (horas >= 12) {
        console.log(" pm ")
        return 'PM' ;
    } else {
        console.log(" am ")
        return 'Am';
    }
  } */


  crearActividad(): void{
    this.actividad.id = this.acti.actividades.length;
    this.acti.createActividad(this.actividad).subscribe(
      (response) => {
        console.log('Actividad agregada: ', response);
        this.listarActividades();
        this.actividad = new Actividad(
          0,
          " ",
          " ",
          " ",
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          0,
          0,
          0,
          0,
          0
        );
      }
    )
  }

  eliminarActividad(id: number) {
    this.acti.eliminarActividad(id).subscribe(
      (response) => {
        console.log(' La actividad se elimino con exito ', response);
        this.listarActividades();
        this.actividad = new Actividad(
          0,
          " ",
          " ",
          " ",
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          0,
          0,
          0,
          0,
          0
        );
      }
    )
  }

  consultarActividad(id: number){
    this.acti.consultarActividad(id).subscribe(
      (data) => {
        this.actividad = data;
      }
    );
  }
  
  actualizarActividad(id: number, datosActualizados: any) {
    this.acti.actualizarActividad(id, datosActualizados).subscribe(
      (response) => {
        this.listarActividades();
        this.actividad = new Actividad(
          0,
          " ",
          " ",
          " ",
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          new Date(),
          0,
          0,
          0,
          0,
          0
        );
      }
    );
  }
}
