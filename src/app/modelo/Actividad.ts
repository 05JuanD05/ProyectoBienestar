import { Coordinador } from "./Coordinador";
import { Disciplina } from "./Disciplina";
import { Escenario } from "./Escenario";
import { Instructor } from "./Instructor";
import { Periodo } from "./Periodo";
import { TipoActividad } from "./TipoActividad";

export class Actividad {
    id: number = 0;
    titulo: String = "";
    dia: String = "";
    estado: String = "";
    horaInicial: Date = new Date();
    horaFinal: Date = new Date();
    fechaCreacion: Date = new Date();
    fechaPublicacion: Date = new Date();
    fechaInicioInscripcion: Date = new Date();
    fechaFinalInscripcion: Date = new Date();
    escenario_id: number = 0;
    tipoActividad_id: number = 0;
    periodo_id: number = 0;
    coordinador_id: number = 0;
    instructor_id: number = 0;

constructor(
        id: number = 0,
        titulo: String = "",
        dia: String = "",
        estado: String = "",
        horaInicial: Date = new Date(),
        horaFinal: Date = new Date(),
        fechaCreacion: Date = new Date(),
        fechaPublicacion: Date = new Date(),
        fechaInicioInscripcion: Date = new Date(),
        fechaFinalInscripcion: Date = new Date(),
        escenario_id: number = 0,
        tipoActividad_id: number = 0,
        periodo_id: number = 0,
        coordinador_id: number = 0,
        instructor_id: number = 0
    ) {
        this.id = id;
        this.titulo = titulo;
        this.dia = dia;
        this.estado = estado;
        this.horaInicial = horaInicial;
        this.horaFinal = horaFinal;
        this.fechaCreacion = fechaCreacion;
        this.fechaPublicacion = fechaPublicacion;
        this.fechaInicioInscripcion = fechaInicioInscripcion;
        this.fechaFinalInscripcion = fechaFinalInscripcion;
        this.escenario_id = escenario_id;
        this.tipoActividad_id = tipoActividad_id;
        this.periodo_id = periodo_id;
        this.coordinador_id = coordinador_id;
        this.instructor_id = instructor_id;
    }
}