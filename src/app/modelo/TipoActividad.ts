export class TipoActividad {
    id: number = 0;
    titulo: String = "";
    objetivo: String = "";
    descripcion: String = "";

    constructor(id: number, titulo: String, objetivo: String, descripcion: String) {
        this.id = id;
        this.titulo = titulo;
        this.objetivo = objetivo;
        this.descripcion = descripcion;
    }

}