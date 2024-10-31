import { Component } from '@angular/core';
import { Actividad } from 'src/app/modelo/Actividad';
import { Asistencia } from 'src/app/modelo/Asistencia';
import { Inscripcion } from 'src/app/modelo/Inscripcion';
import { Usuario } from 'src/app/modelo/Usuario';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { SessionService } from 'src/app/servicios/session.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-inscripcion',
  templateUrl: './lista-inscripcion.component.html',
  styleUrls: ['./lista-inscripcion.component.scss']
})
export class ListaInscripcionComponent {

  public fechaHoy2 = new Date();

  public fechaHoy = new Date();

  public misIncripciones: Inscripcion[] = this.inscripcion.inscripcion;

  public incripcionesActividad: Inscripcion[] = [];

  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  public insc: Inscripcion | undefined;
  public _usuario: Usuario[] = [];
  public _actividad: Actividad = new Actividad();
  public nuevaAsistencia: Asistencia | undefined;

  public actividades: Actividad[] = this.acti.actividades;

  public asistencias: Asistencia[] = this.asistencia.asistencia;
  public usuariosList: Usuario[] = this.usua.usuarios;


  constructor(private inscripcion: InscripcionService, private sesSer: SessionService, private asistencia: AsistenciaService
    , private acti: ActividadService, private usua: UsuarioService) { }

  ngOnInit() {
    this.listarAsistencia();
    this.listarIncripciones();
    this.usuario = this.sesSer.getUser();
    this.listarActividades();
  }

  ngAfterViewChecked() {
    this.buscarInscripcion();
  }


  listarIncripciones() {
    this.inscripcion.obtenerInscripcion().subscribe(
      (data) => {

        this.misIncripciones = data;
      }
    );
  }

  listarUsuarios() {
    this.usua.obtenerUsuarios().subscribe(
      (data) => {

        this.usuariosList = data;
      }
    );
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
      }
    )
  }

  listarAsistencia() {
    this.asistencia.obtenerAsistencia().subscribe(
      (data) => {

        this.asistencias = data;
      }
    );
  }

 

consultaAsistenciaE(id: number) {
    let a = null;
    for (let i = 0; i < this.asistencias.length; i++) {
        
        if (this.asistencias[i].inscripcion_id === id && this.asistencias[i].fecha=== this.fechaHoy) {
            a = true;
            break;
        } else {
            a = false;
        }
    }
    return a;
}

agregarAsistencia(idAS: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear la asistencia?');
    const entero: number = this.usuariosList.length + 1;
if(confirmacion){
    if ( this.consultaAsistenciaE(idAS)!== true ) {
        this.nuevaAsistencia = new Asistencia(entero, true, new Date(), idAS);

        this.asistencia.createAsistencia(this.nuevaAsistencia).subscribe(
            (response) => {
                console.log('Actividad agregada: ', response);
            },
            (error) => {
                console.error('Error al agregar la actividad: ', error);
            }
        );
    } else {
        window.confirm('la asistencia ya existe')
    }
  }
}


  eliminarEscenario(id:number){
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear la asistencia?');
    
    if(confirmacion){

    this.asistencia.eliminarAsistencia(id).subscribe(
      (response) => {
        console.log('asistencia se elimino', response);
        this.listarAsistencia();
       
      }
    );

    }
  }

  mostrarNombreUsuario(id: Number) {

    let nombre: String = "";
    for (let i: number = 0; i < this.usuariosList.length; i++) {
      if (this.usuariosList[i].id === id) {
        nombre = this.usuariosList[i].nombre;
      }
    }
    return nombre;


  }

  getDia(i: number) {
    let dia: String[] = new Array(7);

    if (i >= 0 && i <= 6) {

      dia[0] = "Domingo";
      dia[1] = "Lunes";
      dia[2] = "Martes";
      dia[3] = "Miercoles";
      dia[4] = "Jueves";
      dia[5] = "Viernes";
      dia[6] = "Sabado";
    }
    return dia[i];

  }

  buscarInscripcion() {

    this.incripcionesActividad = [];
    var actividades_ = [];
    var a = [];

    actividades_ = this.actividades;
    a = actividades_.filter(objeto => objeto.instructor_id === this.usuario.id);

 

    var aFiltrado = [];
    for (let p: number = 0; p < a.length; p++) {
      if (a[p].dia === this.getDia(this.fechaHoy2.getDay())) {
        aFiltrado.push(a[p]);
        
      }
    }

    for (let i: number = 0; i < aFiltrado.length; i++) {
      for (let e: number = 0; e < this.misIncripciones.length; e++) {
        if (aFiltrado[i].id === this.misIncripciones[e].actividad_id) {
          this.incripcionesActividad.push(this.misIncripciones[e]);
        }
      }
    }
  }




}








