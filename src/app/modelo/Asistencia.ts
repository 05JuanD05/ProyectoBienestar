import { Inscripcion } from "./Inscripcion";
import { Usuario } from "./Usuario";

export class Asistencia {
    id: number = 0;
    asistio: boolean = false;
    fecha:Date = new Date();
    inscripcion_id: number = 0 ;


    constructor(id: number, asistio: boolean, fecha:Date = new Date(), inscripcion_id: number) {
        this.id = id;
        this.asistio = asistio;
        this.fecha = fecha;
        this.inscripcion_id = inscripcion_id;
    }


}