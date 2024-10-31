import { Component, OnInit } from '@angular/core';
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
import { SessionService } from 'src/app/servicios/session.service';
import { PeriodoService } from 'src/app/servicios/periodo.service';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  private idContador: number = 1 ;
  semestreActual: Periodo | null = null;
  mensajeError: string = '';

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
  public semes: Periodo | null = null;
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

  constructor(private acti: ActividadService, private instser: InstructorService, private escenar: EscenarioService, private tipaser: TipoActividadService, private sesSer: SessionService, private semestre: PeriodoService) { }

  ngOnInit() {
    this.usuario=this.sesSer.getUser()
    this.listarActividades();
    this.listarUsuarios();
    this.listarEscenarios();
    this.listarTiposActividad();
    this.consultarPeriodo();
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

  listarActividades(): void {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
        console.log('Actividades disponibles: ', this.actividades);
      },
      (error) => {
        console.error('Error al obtener actividades:', error);
      }
    );
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

  crearActividad(): void {
    // Verifica que todos los campos obligatorios estén llenos
    if (!this.actividad.titulo ||
        !this.actividad.fechaFinalInscripcion ||
        !this.actividad.horaInicial ||
        !this.actividad.horaFinal ||
        !this.actividad.dia ||
        !this.actividad.estado ||
        !this.escenario?.nombre ||
        !this.tipo?.titulo ||
        !this.usuario?.nombre) {
          // Si algún campo está vacío, muestra un mensaje de error
          this.mensajeError = 'Por favor, completa todos los campos requeridos.';
          return;
        }

      // Limpia el mensaje de error si todos los campos están llenos
      this.mensajeError = '';

      // Si todos los campos están completos, crea la actividad
      this.actividad.id = this.idContador++; // Asegúrate de que esto es correcto
      this.acti.createActividad(this.actividad).subscribe(
        (response) => {
          console.log('Actividad agregada: ', response);
          this.listarActividades();

          // Reinicia el objeto actividad después de crearla
          this.actividad = new Actividad(
            0,
            "",
            "",
            "",
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

  cambiarEstado(nuevoEstado: string): void {
    this.actividad.estado = nuevoEstado;
  }
  

  eliminarActividad(id: number) {
    console.log('ID a eliminar:', id);
    this.acti.eliminarActividad(id).subscribe(
      (response) => {
        console.log(' La actividad se eliminó con éxito ', response);
        this.listarActividades();
      },
      (error) => {
        console.error('Revisa bien', error);
      }
    );
  }

  consultarPeriodo() {
    this.semestre.obtenerSemestre().subscribe(
      (data) => {
        // Busca el semestre que está marcado como actual
        const semestreActual = data.find(sem => sem.actual);
        if (semestreActual) {
          // Asigna los valores del semestre actual si existe
          this.actividad.periodo_id = semestreActual.id;
          this.semes = semestreActual; // Guarda el semestre actual (un objeto, no un array)
        }
      },
      (error) => {
        console.error('Error al obtener el semestre:', error);
      }
    );
  }
}
