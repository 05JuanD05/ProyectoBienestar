export class Escenario {
    id: string = "";  
    nombre: string = "";
    direccion: string = "";
    coordenadaX: string = "";
    coordenadaY: string = "";
    estado: string = "";
    imagen: string = "";

    constructor(id: string, nombre: string, direccion: string,
        coordenadaX: string, coordenadaY: string, estado: string, imagen: string) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.coordenadaX = coordenadaX;
        this.coordenadaY = coordenadaY;
        this.estado = estado;
        this.imagen = imagen;
    }
}
