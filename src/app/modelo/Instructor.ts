import { Disciplina } from "./Disciplina";
import { Usuario } from "./Usuario";
export class Instructor {
    id: number = 0;
    nombre: string = "";
    apellido: string = "";
    identificacion: string = "";
    email: string = "";
    telefono: string = "";
    tipo: string = "";//Para saber que tipo de usuario ingresa al sistema
    estado: string = "";
    especialidad: string = "";
    disciplina: Disciplina = new Disciplina(0, "", "", "");
    usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "")

    constructor(esp: string, dis: Disciplina, idu: number, usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "")) {
        this.especialidad = esp;
        this.disciplina = dis;
        this.id = idu;
        this.usuario = usuario;
    } 

    public validar(): boolean {
        return (
            this.especialidad.trim() !== "" &&
            this.disciplina.id > 0 &&
            this.usuario.validar()
        );
    }

    public sincronizarConUsuario(): void {
        this.especialidad = this.usuario.nombre + "" + this.usuario.apellido;
        this.disciplina = new Disciplina(0, this.usuario.disciplina, "", "");
    }

}