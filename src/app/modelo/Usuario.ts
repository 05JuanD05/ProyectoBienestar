export class Usuario {
    id: number = 0;
    nombre: string = "";
    apellido: string = "";
    identificacion: string = "";
    email: string = "";
    telefono: string = "";
    login: string = "";
    password: string = "";
    tipo: string = "";//Para saber que tipo de usuario ingresa al sistema
    estado: string = "";
    disciplina: string = "";

    constructor(id: number, nom: string, ape: string, ident: string, ema: string, tel: string, log: string,
        pass: string, tip: string, est: string, dis: string) {
        this.id = id;
        this.nombre = nom;
        this.apellido = ape;
        this.identificacion = ident;
        this.email = ema;
        this.telefono = tel;
        this.login = log;
        this.password = pass;
        this.tipo = tip;
        this.estado = est;
        this.disciplina = dis;
    }

    public informacion(): string {
        let info: string = "";
        info = this.nombre.toUpperCase + " " + this.apellido.toUpperCase;
        return info;
    }

    public validar(): boolean {
        return (
            this.nombre.trim() !== '' &&
            this.apellido.trim() !== '' &&
            this.identificacion.trim() !== '' &&
            this.email.trim() !== '' &&
            this.telefono.trim() !== '' &&
            this.estado.trim() !== ''
        );
    }
  }
