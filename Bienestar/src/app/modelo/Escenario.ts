export class Escenario {
    id: number = 0;
    nombre: String = "";
    direccion: String = "";
    coordenadaX: String = "";
    coordenadaY: String = "";
    estado: String = "";
    imagen: String = ""; 

    constructor(id: number, nombre: String, direccion: String, 
        coordenadaX: String, coordenadaY: String, estado: String, idata: String) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
        this.estado = estado;
        this.imagen = idata;
    }

}