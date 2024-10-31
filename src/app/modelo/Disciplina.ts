export class Disciplina {
    id: number = 0;;
    nombre: String = "";
    descripcion: String = "";
    estado: String = "";

    constructor(id: number, nombre: String, descripcion: String, estado: String) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }

}