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
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-lista-inscripcion',
  templateUrl: './lista-inscripcion.component.html',
  styleUrls: ['./lista-inscripcion.component.scss']
})
export class ListaInscripcionComponent {
  public fechaHoy = new Date();
  public misIncripciones: Inscripcion[] = [];
  public inscripcionesActividad: Inscripcion[] = [];
  public usuario: Usuario = new Usuario(0, '', '', '', '', '', '', '', '', '');
  public actividades: Actividad[] = [];
  public asistencias: Asistencia[] = [];
  public usuariosList: Usuario[] = [];
  public inscripcionesFiltradas: Inscripcion[] = [];
  public seleccionados: number[] = [];

  constructor(
    private inscripcionService: InscripcionService,
    private sessionService: SessionService,
    private asistenciaService: AsistenciaService,
    private actividadService: ActividadService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    forkJoin({
      inscripciones: this.inscripcionService.obtenerInscripcion(),
      actividades: this.actividadService.obtenerActividades(),
      usuarios: this.usuarioService.obtenerUsuarios(),
      asistencias: this.asistenciaService.obtenerAsistencia()
    }).subscribe(

      ({ inscripciones, actividades, usuarios, asistencias }) => {
        this.misIncripciones = inscripciones;
        this.inscripcionesFiltradas = inscripciones;
        this.actividades = actividades;
        this.usuariosList = usuarios;
        this.asistencias = asistencias;
        this.usuario = this.sessionService.getUser();
      },
      error => console.error('Error al cargar los datos:', error)
    );
  }

  // Método para manejar el cambio en los checkboxes
  onCheckboxChange(event: any, id: number) {
    if (event.target.checked) {
      this.seleccionados.push(id); // Añadir ID seleccionado
    } else {
      this.seleccionados = this.seleccionados.filter(item => item !== id); // Eliminar ID desmarcado
    }
  }

  // Guardar asistencia para los seleccionados
  guardarAsistencia() {
    const confirmacion = window.confirm('¿Deseas guardar la asistencia para los estudiantes seleccionados?');
    if (!confirmacion) return;

    const asistencias = this.seleccionados.map(id => {
      return new Asistencia(this.asistencias.length + 1, true, new Date(), id);
    });

    asistencias.forEach(asistencia => {
      this.asistenciaService.createAsistencia(asistencia).subscribe(
        response => console.log('Asistencia guardada:', response),
        error => console.error('Error al guardar la asistencia:', error)
      );
    });

    alert('Asistencia guardada correctamente');
    this.seleccionados = []; // Limpiar seleccionados
  }

  // Filtrar inscripciones por actividad seleccionada
  filtrarPorActividad(valorSeleccionado: string): void {
    if (!valorSeleccionado) {
      this.inscripcionesFiltradas = this.misIncripciones; // Mostrar todo si no hay filtro
      return;
    }

    const actividadId = parseInt(valorSeleccionado, 10);
    this.inscripcionesFiltradas = this.misIncripciones.filter(inscripcion => inscripcion.actividad_id === actividadId);
  }

  // Eliminar asistencia
  eliminarEscenario(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la asistencia?');
    if (confirmacion) {
      this.asistenciaService.eliminarAsistencia(id).subscribe(
        response => {
          console.log('Asistencia eliminada:', response);
          this.listarAsistencia() // Refrescar lista
        },
        error => console.error('Error al eliminar asistencia:', error)
      );
    }
  }

  actualizarAsistencia(inscripcion: Inscripcion) {
    console.log('Estado de asistencia actualizado:', inscripcion.asistencia);
  }

  listarAsistencia() {
    this.asistenciaService.obtenerAsistencia().subscribe(
      (data: Asistencia[]) => {
        this.asistencias = data;
        console.log('Asistencias actualizadas:', this.asistencias);
      },
      error => console.error('Error al obtener asistencias:', error)
    );
  }
}