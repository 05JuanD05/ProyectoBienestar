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

  // Arreglo para almacenar los IDs de las inscripciones seleccionadas
  public seleccionados: number[] = [];

  constructor(
    private inscripcion: InscripcionService,
    private sesSer: SessionService,
    private asistencia: AsistenciaService,
    private acti: ActividadService,
    private usua: UsuarioService
  ) {}

  ngOnInit() {
    this.listarAsistencia();
    this.listarIncripciones();
    this.usuario = this.sesSer.getUser();
    this.listarActividades();
  }

  onCheckboxChange(event: any, id: number) {
    if (event.target.checked) {
      this.seleccionados.push(id); // Añadir el ID si el checkbox está marcado
    } else {
      this.seleccionados = this.seleccionados.filter(item => item !== id); // Remover el ID si se desmarca
    }
  }

  guardarAsistencia() {
    const confirmacion = window.confirm('¿Deseas guardar la asistencia para los estudiantes seleccionados?');
    if (!confirmacion) return;

    // Crear las instancias de asistencia para cada ID seleccionado
    const asistencias = this.seleccionados.map(id => new Asistencia(this.usuariosList.length + 1, true, new Date(), id));

    // Enviar los datos de asistencia al servicio
    asistencias.forEach(asistencia => {
      this.asistencia.createAsistencia(asistencia).subscribe(
        response => {
          console.log('Asistencia guardada:', response);
        },
        error => {
          console.error('Error al guardar la asistencia:', error);
        }
      );
    });
    alert('Asistencia guardada correctamente');
    this.seleccionados = []; // Limpia los seleccionados después de guardar
  }

  listarIncripciones() {
    this.inscripcion.obtenerInscripcion().subscribe((data) => {
      this.misIncripciones = data;
    });
  }

  listarUsuarios() {
    this.usua.obtenerUsuarios().subscribe((data) => {
      this.usuariosList = data;
    });
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe((data) => {
      this.actividades = data;
    });
  }

  listarAsistencia() {
    this.asistencia.obtenerAsistencia().subscribe((data) => {
      this.asistencias = data;
    });
  }

  consultaAsistenciaE(id: number) {
    return this.asistencias.some(
      asistencia => asistencia.inscripcion_id === id && asistencia.fecha === this.fechaHoy
    );
  }

  agregarAsistencia(idAS: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas crear la asistencia?');
    if (confirmacion && !this.consultaAsistenciaE(idAS)) {
      this.nuevaAsistencia = new Asistencia(this.usuariosList.length + 1, true, new Date(), idAS);
      this.asistencia.createAsistencia(this.nuevaAsistencia).subscribe(
        response => console.log('Actividad agregada:', response),
        error => console.error('Error al agregar la actividad:', error)
      );
    } else {
      window.confirm('La asistencia ya existe');
    }
  }

  eliminarEscenario(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la asistencia?');
    if (confirmacion) {
      this.asistencia.eliminarAsistencia(id).subscribe(response => {
        console.log('Asistencia eliminada:', response);
        this.listarAsistencia();
      });
    }
  }
}

