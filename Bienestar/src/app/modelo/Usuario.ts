export class Usuario {
    id: number = 0;
    nombre: String = "";
    apellido: String = "";
    identificacion: String = "";
    email: String = "";
    telefono: String = "";
    login: String = "";
    password: String = "";
    tipo: String = "";//Para saber que tipo de usuario ingresa al sistema
    estado: String = "";

    constructor(id: number, nom: String, ape: String, ident: String, ema: String, tel: String, log: String,
        pass: String, tip: String, est: String) {
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
    }

    public informacion(): string {
        let info: string = "";
        info = this.nombre.toUpperCase + " " + this.apellido.toUpperCase;
        return info;
    }

    public validar(): boolean {
        let valido: boolean = true;
        if (this.nombre.trim() === '' || this.apellido.trim() === '' || this.identificacion.trim() === '') {
            valido = false;
        }
        if (this.email.trim() === '' || this.login.trim() === '' || this.password.trim() === '') {
            valido = false;
        }
        if (this.tipo.trim() === '' || this.estado.trim() === '' || this.telefono.trim() === '') {
            valido = false;
        }
        return valido;
    }


} 