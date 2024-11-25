import { Disciplina } from "./Disciplina";

export class Instructor {
    id: number = 0;
    nombreProfe: string = "";
    apellidoProfe: string = "";
    cedula: string = "";
    emailProfe: string = "";
    estadoProfe: string = "";
    numeroTelefono: string = "";
    especialidad: string = "";
    tipoI: string = ""; // Para saber qué tipo de usuario es
    disciplina: Disciplina = new Disciplina(0, "", "", "");
    loginP: string = "";
    passwordP: string = "";

    constructor(
        id: number, 
        nombrep: string, 
        apellidop: string, 
        cedula: string, 
        numero: string, 
        tipo: string, 
        estado: string, 
        esp: string, 
        dis: Disciplina, 
        login: string, 
        password: string
    ) {
        this.id = id;
        this.nombreProfe = nombrep;
        this.apellidoProfe = apellidop;
        this.cedula = cedula;
        this.numeroTelefono = numero;
        this.tipoI = tipo;
        this.estadoProfe = estado;
        this.especialidad = esp;
        this.disciplina = dis;
        this.loginP = login;
        this.passwordP = password;
    }

    public validar(): boolean {
        return (
            this.nombreProfe.trim() !== "" &&
            this.apellidoProfe.trim() !== "" &&
            this.cedula.trim() !== "" &&
            this.emailProfe.trim() !== "" &&
            this.numeroTelefono.trim() !== "" &&
            this.loginP.trim() !== "" &&
            this.disciplina.nombre.trim() !== "" &&
            this.passwordP.trim() !== ""
        );
    }
}
