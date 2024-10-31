export class Programa {
    id: number = 0;
    codigo: String = "";
    nombre: String = "";
    estado: String = "";

    constructor(id: number, codigo: String, nombre: String, estado: String) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.estado = estado;
    }

}