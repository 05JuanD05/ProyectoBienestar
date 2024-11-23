export class Disciplina {
    id: number = 0;;
    nombre: string = "";
    descripcion: string = "";
    estado: string = "";

    constructor(id: number, nombre: string, descripcion: string, estado: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }

}